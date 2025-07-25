import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const createDivision = async (payload: Partial<IDivision>) => {
  const isDivisionExist = await Division.findOne({ name: payload.name });

  if (isDivisionExist)
    throw new AppError(httpStatus.BAD_REQUEST, "Division Already Exits");

  const division = await Division.create(payload);
  return division;
};

const getAllDivision = async () => {
  const divisions = await Division.find({});
  const totalDivision = await Division.countDocuments();

  return {
    data: divisions,
    meta: {
      total: totalDivision,
    },
  };
};

const getSingleDivision = async (slug: string) => {
  return await Division.findOne({ slug });
};

const updateDivision = async (
  divisionId: string,
  payload: Partial<IDivision>
) => {
  const isDivisionExist = await Division.findById(divisionId);
  if (!isDivisionExist)
    throw new AppError(httpStatus.NOT_FOUND, "Division Not Found");

  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: divisionId },
  });

  if (duplicateDivision)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "A division with this name already exists"
    );

  const updateDivision = await Division.findByIdAndUpdate(divisionId, payload, {
    new: true,
    runValidators: true,
  });

  if (payload.thumbnail && isDivisionExist.thumbnail) {
    await deleteImageFromCloudinary(isDivisionExist.thumbnail);
  }

  return updateDivision;
};

const deleteDivision = async (divisionId: string) => {
  await Division.findByIdAndDelete(divisionId);
  return null;
};

export const DivisionService = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
  getSingleDivision,
};
