import {Router} from 'express';
import appointmentsRouter from "./appontments.routes";

const routes = Router();

routes.use('/appointments', appointmentsRouter)

routes.get('/', (req, res) => {
    res.send('hello')
})



export default routes;