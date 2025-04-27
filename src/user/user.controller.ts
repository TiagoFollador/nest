import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import { ListUserDTO } from "./dto/ListUser.dto";

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

        const user = new ListUserDTO(
            userEntity.name,
            userEntity.id
        )
        
        return {
            message: 'User created sucessfully!', 
            user: user
        };
    }

    @Get()
    async usersList() {
        const savedUsers =  await this.userRepository.list();
        const usersList = savedUsers.map((user) => new ListUserDTO(
            user.name,
            user.id
        ));

        const data = {
            users: usersList
        }
        return data
    }
}