import { Router } from "express";
import { MonoController } from "./controller";

export class MonoRoutes {
  static get routes(): Router {
    const router = Router();
    const monoCaseController = new MonoController();
    
    router.get("/", monoCaseController.getMonoCases);
    router.post("/", monoCaseController.createMonoCase);
    router.get("/:id", monoCaseController.getMonoCaseById);
    router.put("/:id", monoCaseController.updateMonoCase);
    router.delete("/:id", monoCaseController.deleteMonoCase);
    router.get("/recent", monoCaseController.getRecentMonoCases);
    return router;
  }
}