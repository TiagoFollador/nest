import { Body, Controller, Get, Post } from "@nestjs/common";
import { usersRepository } from "./users.repository";

@Controller('/users')
export class UserController {

    private usersRepository = new usersRepository();

    @Post()
    async createUser(@Body() userData) {
        this.usersRepository.save(userData);
        
        return {
            message: 'User created', 
            user: userData
        };
    }

    @Get()
    async usersList() {
        const data = {
            users: this.usersRepository.list()
        }
        return data
    }
}