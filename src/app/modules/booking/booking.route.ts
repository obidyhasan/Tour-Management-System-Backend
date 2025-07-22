import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createBookingZodSchema,
  updateBookingStatusZodSchema,
} from "./booking.validation";
import { BookingController } from "./booking.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

// api/v1/booking
router.post(
  "/",
  validateRequest(createBookingZodSchema),
  checkAuth(...Object.values(Role)),
  BookingController.createBooking
);

router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  BookingController.getAllBookings
);

router.get(
  "/my-bookings",
  checkAuth(...Object.values(Role)),
  BookingController.getUserBookings
);

router.get(
  "/:bookingId",
  checkAuth(...Object.values(Role)),
  BookingController.getSingleBooking
);

router.patch(
  "/:bookingId/status",
  checkAuth(...Object.values(Role)),
  validateRequest(updateBookingStatusZodSchema),
  BookingController.updateBookingStatus
);

export const BookingRoutes = router;
