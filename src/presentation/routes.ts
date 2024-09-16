import { Router } from "express";
import { MonoRoutes } from "./monos/routes";

export class AppRoutes {
  static get routes(): Router{
    const router = Router();
    router.use("/api/mono", MonoRoutes.routes);
    return router;
  }
}