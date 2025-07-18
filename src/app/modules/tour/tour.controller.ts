/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TourService } from "./tour.service";
import { sendResponse } from "../../utils/sendResponse";

/* -------------------------- Tour Type ---------------------------- */

const createTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourType = await TourService.createTourType(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Tour Type Created Successfully",
      data: tourType,
    });
  }
);

const getAllTourTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourTypes = await TourService.getAllTourTypes();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Get All Tour Type Successfully",
      data: tourTypes,
    });
  }
);

const updateTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourType = await TourService.updateTourType(
      req.params.tourTypeId,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Tour Type Updated Successfully",
      data: tourType,
    });
  }
);

const deleteTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await TourService.deleteTourType(req.params.tourTypeId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Tour Type Deleted Successfully",
      data: null,
    });
  }
);

/* -------------------------- Tour Controller ---------------------------- */
const getAllTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourService.getAllTour();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Get All Tour Successfully",
      data: result,
    });
  }
);

const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourService.createTour(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Tour Created Successfully",
      data: result,
    });
  }
);
const updateTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourService.updateTour(req.params.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Tour Updated Successfully",
      data: result,
    });
  }
);
const deleteTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourService.deleteTour(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Tour Deleted Successfully",
      data: result,
    });
  }
);

export const TourController = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  createTour,
  getAllTour,
  updateTour,
  deleteTour,
};
