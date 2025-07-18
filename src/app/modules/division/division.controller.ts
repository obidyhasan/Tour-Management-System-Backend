import httpStatus from "http-status-codes";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DivisionService } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";

const createDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await DivisionService.createDivision(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Division Create Successfully",
      data: result,
    });
  }
);

const getAllDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const divisions = await DivisionService.getAllDivision();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Get All Division Successfully",
      data: divisions,
    });
  }
);

const getSingleDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await DivisionService.getSingleDivision(req.params.slug);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Get Single Division Successfully",
      data: result,
    });
  }
);

const updateDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const division = await DivisionService.updateDivision(
      req.params.divisionId,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Division Updated Successfully",
      data: division,
    });
  }
);

const deleteDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await DivisionService.deleteDivision(req.params.divisionId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Division Deleted Successfully",
      data: null,
    });
  }
);

export const DivisionController = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
  getSingleDivision,
};
