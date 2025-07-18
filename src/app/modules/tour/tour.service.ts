import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";

/* -------------------------- Tour Type Service ---------------------------- */

const createTourType = async (payload: Partial<ITourType>) => {
  const isTourTypeExits = await TourType.findOne({ name: payload.name });

  if (isTourTypeExits)
    throw new AppError(httpStatus.BAD_REQUEST, "Tour Type Already Exist");

  return await TourType.create(payload);
};

const getAllTourTypes = async () => {
  return await TourType.find();
};

const updateTourType = async (
  tourTypeId: string,
  payload: Partial<ITourType>
) => {
  const isTourTypeExits = await TourType.findById(tourTypeId);
  if (!isTourTypeExits)
    throw new AppError(httpStatus.NOT_FOUND, "Tour type not found");

  const tourType = await TourType.findByIdAndUpdate(tourTypeId, payload, {
    new: true,
  });

  return tourType;
};

const deleteTourType = async (tourTypeId: string) => {
  const isTourTypeExits = await TourType.findById(tourTypeId);
  if (!isTourTypeExits)
    throw new AppError(httpStatus.NOT_FOUND, "Tour type not found");

  return await TourType.findByIdAndDelete(tourTypeId);
};

/* -------------------------- Tour Service ---------------------------- */

const getAllTour = async () => {
  const tours = await Tour.find({});
  const totalTours = await Tour.countDocuments();

  return {
    data: tours,
    meta: {
      total: totalTours,
    },
  };
};

const createTour = async (payload: Partial<ITour>) => {
  const isTourExists = await Tour.findOne({ title: payload.title });
  if (isTourExists)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "A tour with this title already exists"
    );

  const tour = await Tour.create(payload);
  return tour;
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const isTourExists = await Tour.findById(id);
  if (!isTourExists) throw new AppError(httpStatus.NOT_FOUND, "Tour not found");

  const updateTour = await Tour.findByIdAndUpdate(id, payload, { new: true });
  return updateTour;
};

const deleteTour = async (id: string) => {
  await Tour.findByIdAndDelete(id);
  return null;
};

export const TourService = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  getAllTour,
  createTour,
  updateTour,
  deleteTour,
};
