import {Router} from 'express';

import AuthenticateUserService from "../service/AuthenticateUserService";

const sessionsRouter = Router();

/**
 * Analise rules in Service
 */

sessionsRouter.post('/', async (req, res) => {
    try {
        const  { email, password } = req.body;

        const authenticateUserService = new AuthenticateUserService();

        const { user } = await authenticateUserService.execute({
            email,
            password
        });

        delete user.password

        return res.json({user})

    } catch(e){
        return res.status(400).json({error: e.message});
    }
});


export default sessionsRouter;

