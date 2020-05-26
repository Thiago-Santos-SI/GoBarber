import {Router} from 'express';
import {parseISO} from 'date-fns'
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../service/CreateAppointmentService";

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) =>{
    const appointments = appointmentsRepository.all();

    return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) =>{
    try {
        const { provider, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService(
            appointmentsRepository);

        const appointment = createAppointmentService.execute({
            date: parsedDate,
            provider
        });

        return res.json(appointment);

    } catch(e){
        return res.status(400).json({error: e.message});
    }
});


export default appointmentsRouter;

