import { IsNotEmpty } from "class-validator";

export class ProductCharacteristicsDTO {
    @IsNotEmpty({
        message: "Characteristic name is a required field"
    })
    name:string;
    
    @IsNotEmpty({
        message: "Characteristic description is a required field"
    })
    description: string;
}