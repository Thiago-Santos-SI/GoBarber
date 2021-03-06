import {getRepository} from "typeorm";
import { compare } from  "bcryptjs"
import {sign, verify} from 'jsonwebtoken'
import authConfig from '../config/auth'

import User from "../models/User";


interface RequestDTO {
    email: string;
    password: string
}

interface Res {
    user: User;
    token: string;
}


class AuthenticateUserService {
    public async execute({ email, password }: RequestDTO): Promise<Res>{
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(({
            where: {email}
        }));

        if (!user){
            throw new Error('Incorrect email or password combination.')
        }

        const passwordMatched = await compare( password, user.password);

        if (!passwordMatched){
            throw new Error('Incorrect email or password combination.')
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;