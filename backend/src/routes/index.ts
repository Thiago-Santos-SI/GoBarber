import {Router} from 'express';
import appointmentsRouter from "./appontments.routes";

const routes = Router();

routes.use('/appointments', appointmentsRouter);


export default routes;