import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    router: UserRoutes,
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
