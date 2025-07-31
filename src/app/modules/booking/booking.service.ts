/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import { Tour } from "../tour/tour.model";
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { getTransactionId } from "../../utils/getTransactionId";

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transactionId = getTransactionId();

  // Create Session / Transaction Callback
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId);
    if (!user?.phone || !user?.address)
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Please update your profile to Book a Tour."
      );

    const tour = await Tour.findById(payload.tour).select("costFrom");
    if (!tour?.costFrom)
      throw new AppError(httpStatus.BAD_REQUEST, "No Tour Cost Found");

    const amount = Number(tour.costFrom) * Number(payload.guestCount);

    const booking = await Booking.create(
      [
        {
          user: userId,
          status: BOOKING_STATUS.PENDING,
          ...payload,
        },
      ],
      { session }
    );

    const payment = await Payment.create(
      [
        {
          booking: booking[0]._id,
          status: PAYMENT_STATUS.UNPAID,
          transactionId: transactionId,
          amount: amount,
        },
      ],
      { session }
    );

    const updateBooking = await Booking.findByIdAndUpdate(
      booking[0]._id,
      { payment: payment[0]._id },
      { new: true, runValidators: true, session }
    )
      .populate("user", "name email phone address")
      .populate("tour", "title costFrom")
      .populate("payment");

    const userAddress = (updateBooking?.user as any).address;
    const userEmail = (updateBooking?.user as any).email;
    const userPhoneNumber = (updateBooking?.user as any).phone;
    const userName = (updateBooking?.user as any).name;

    const sslPayload: ISSLCommerz = {
      address: userAddress,
      amount: amount,
      email: userEmail,
      name: userName,
      phoneNumber: userPhoneNumber,
      transactionId: transactionId,
    };

    const sslPayment = await SSLService.sslPaymentInit(sslPayload);

    await session.commitTransaction(); // transaction / save to db
    session.endSession();

    return {
      paymentUrl: sslPayment.GatewayPageURL,
      booking: updateBooking,
    };
  } catch (error) {
    await session.abortTransaction(); // roll back
    session.endSession();
    throw error;
  }
};
const getUserBookings = async () => {
  return {};
};
const getBookingById = async () => {
  return {};
};
const updateBookingStatus = async () => {
  return {};
};
const getAllBookings = async () => {
  return {};
};

export const BookingService = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getAllBookings,
};
