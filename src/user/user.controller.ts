import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Controller('/users')
export class UserController {


    constructor(private userRepository: UserRepository) {}

    @Post()
    async createUser(@Body() userData) {
        this.userRepository.save(userData);
        
        return {
            message: 'User created', 
            user: userData
        };
    }

    @Get()
    async usersList() {
        const data = {
            users: this.userRepository.list()
        }
        return data
    }
}