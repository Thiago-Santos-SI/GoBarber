import {getRepository} from "typeorm";
import { compare } from  "bcryptjs"

import User from "../models/User";


interface RequestDTO {
    email: string;
    password: string
}

interface Res {
    user: User;
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

        return {
            user,
        };
    }
}

export default AuthenticateUserService;