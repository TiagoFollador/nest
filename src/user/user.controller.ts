import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";

@Controller('/users')
export class UserController {


    constructor(private userRepository: UserRepository) {}

    @Post()
    async createUser(@Body() userData: CreateUserDTO) {
        const userEntity = new UserEntity();
        userEntity.name = userData.name;
        userEntity.email = userData.email;
        userEntity.password = userData.password;
        userEntity.id = uuid();

        await this.userRepository.save(userEntity);
        
        return {
            message: 'User created sucessfully!', 
            userId: userEntity.id
        };
    }

    @Get()
    async usersList() {
        const data = {
            users: await this.userRepository.list()
        }
        return data
    }
}