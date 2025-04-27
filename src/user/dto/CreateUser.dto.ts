import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"
import { EmailIsUnique } from "../validation/email-is-unique.validator";

export class CreateUserDTO {

    @IsNotEmpty({
        message: "Name is a required field"
    })
    name: string;

    @IsEmail(undefined, {
        message: "This email is invalid, try again"
    })
    @EmailIsUnique({
        message: "This email is already in use by another user!"
    })
    email: string;

    @MinLength(6, {
        message: "This password must be at least 6 characters long"
    })
    password: string;
}