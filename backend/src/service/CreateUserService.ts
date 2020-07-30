import User from "../models/User";
import {getRepository} from "typeorm";
import {hash} from  "bcryptjs"

interface RequestDTO {
    name: string;
    email: string;
    password: string;
    
}

/**
 *  dont need create new repository for User, because just need when the methods personality
 *  so, use functions of getRepository-typeorm
 */

class CreateUserService {
    public async execute({ name, email, password }: RequestDTO): Promise<User>{
        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: {email}
        });

        if (checkUserExists){
            throw new Error('Email address already used.')
        }

        const hashedPassword = await  hash(password, 8);


        const user = userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await userRepository.save(user);

        return user;
    }

}

export default CreateUserService;