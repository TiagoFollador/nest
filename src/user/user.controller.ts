import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import { ListUserDTO } from "./dto/ListUser.dto";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";

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
    
    @Get('/:id')
    async getUserById(@Param('id') id: string) {
        const user =  await this.userRepository.findUserById(id);
        
        const userList = new ListUserDTO(
            user.name,
            user.id
        );

        const data = {
            users: userList
        }
        return data
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDTO) {
        try {
            const updatedUser = await this.userRepository.update(id, userData);

            return {
                message: 'User updated sucessfully!',
                user: updatedUser
            }
        } catch (error) {
            return {
                message: `Error: ${error.message}`,
                code: 400
            }
        }
    }

    @Delete('/:id')
    async deleteUser(@Param("id") id: string) {
        try {
            const deletedUser = await this.userRepository.delete(id);

            if (deletedUser) {
                return {
                    message: "User deleted sucessfully!",
                    code: 200
                }
            }
        } catch (error) {
            return {
                message: `Error: ${error.message}`,
                code: 400
            }
        }
    }
}