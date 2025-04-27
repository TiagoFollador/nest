import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
   
    constructor(private userRepository: UserRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const userEmailExists = await this.userRepository.emailAlredyCreated(value);
        return !userEmailExists;
    }
}

export const EmailIsUnique = (validateOptions: ValidationOptions) => {
    return (object: Object, property: string) => {
        registerDecorator({
            target: object.constructor, // construtor do objeto a ser passado
            propertyName: property,
            options: validateOptions,
            constraints: [],
            validator: EmailIsUniqueValidator // valor para a classe calidator
        });
    }
}