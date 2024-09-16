import { Request, Response } from "express";
import { MonoModel } from "../../data/models/mono.model";

export class MonoController {
  public getMonoCases = async (req: Request, res: Response) => {
    try {
      const monoCases = await MonoModel.find();
      return res.json(monoCases);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los casos." });
    }
  };

  public createMonoCase = async (req: Request, res: Response) => {
    try {
      const { lat, lng, genre, age } = req.body;
      const newMonoCase = await MonoModel.create({
        lat,
        lng,
        genre,
        age,
      });
      return res.json(newMonoCase);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el caso." });
    }
  };

  public getMonoCaseById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const monoCase = await MonoModel.findById(id);
      return res.json(monoCase);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el caso." });
    }
  };

  public updateMonoCase = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { lat, lng, genre, age } = req.body;
      const monoCase = await MonoModel.findByIdAndUpdate(id, {
        lat,
        lng,
        genre,
        age,
      }, { new: true });
      return res.json(monoCase);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el caso." });
    }
  };

  public deleteMonoCase = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await MonoModel.findByIdAndDelete(id);
      return res.json({ message: "Caso eliminado correctamente." });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el caso." });
    }
  };

  public getRecentMonoCases = async (req: Request, res: Response) => {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      console.log("Fecha de hace una semana:", oneWeekAgo);
      const recentMonoCases = await MonoModel.find({
        creationDate: { $gte: oneWeekAgo.toISOString() }
      });
  
      return res.json(recentMonoCases);
    } catch (error: any) {
      console.error("Error details:", error); 
      res.status(500).json({ 
        message: "Error al obtener los casos recientes.",
        error: error.message || "Error desconocido"
      });
    }
  };
}