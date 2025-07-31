import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRouters } from "../modules/auth/auth.route";
import { DivisionRouters } from "../modules/division/division.route";
import { TourRouters } from "../modules/tour/tour.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { PaymentRouter } from "../modules/payment/payment.route";
import { OTPRouter } from "../modules/otp/otp.router";
import { StatsRouters } from "../modules/stats/stats.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    router: UserRoutes,
  },
  {
    path: "/auth",
    router: AuthRouters,
  },
  {
    path: "/division",
    router: DivisionRouters,
  },
  {
    path: "/tour",
    router: TourRouters,
  },
  {
    path: "/booking",
    router: BookingRoutes,
  },
  {
    path: "/payment",
    router: PaymentRouter,
  },
  {
    path: "/otp",
    router: OTPRouter,
  },
  {
    path: "/stats",
    router: StatsRouters,
  },
  //   {
  //     path: "/tour",
  //     router: TourRoutes,
  //   },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

// router.use("/user", UserRoutes);
