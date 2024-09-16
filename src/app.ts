import express,{Request,Response} from 'express';
import { MongoDatabase } from './data/init';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { emailJob } from './domain/jobs/email.job';

const app = express();
(async ()=> await MongoDatabase.connect({
    mongoUrl:envs.MONGO_URL,
    dbName:envs.MONGO_DB
}))()
app.use(express.json());
app.use(AppRoutes.routes);
app.get("/",(req: Request, res:Response)=>{
    res.send("Hola a todos")
});

app.listen(3000,()=>{
    console.log("Server running on PORT")
    emailJob();
});