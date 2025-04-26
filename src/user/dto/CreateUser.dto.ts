import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateUserDTO {

    @IsNotEmpty({
        message: "Name is a required field"
    })
    name: string;

    @IsEmail(undefined, {
        message: "This email is invalid, try again"
    })
    email: string;

    @MinLength(6, {
        message: "This password must be at least 6 characters long"
    })
    password: string;
}