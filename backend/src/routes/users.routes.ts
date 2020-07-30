import {Router} from 'express';

import CreateUserService from "../service/CreateUserService";

const usersRouter = Router();

/**
 * Analise rules in Service
 */

usersRouter.post('/', async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return res.json(user)

    } catch(e){
        return res.status(400).json({error: e.message});
    }
});


export default usersRouter;

