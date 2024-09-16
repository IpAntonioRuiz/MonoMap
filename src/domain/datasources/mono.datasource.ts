import { MonoModel } from "../../data/models/mono.model";
import { IMonoDocument } from "../entities/mono.entity";

export class MonoDataSource {
    public updateMonoCase = async (id: string, monoCase: Partial<IMonoDocument>) => {
        await MonoModel.findByIdAndUpdate(id, {
            lat: monoCase.lat,
            lng: monoCase.lng,
            isSent: monoCase.isSent,
            genre: monoCase.genre,
            age: monoCase.age,
            creationDate: monoCase.creationDate
        });
    }
}