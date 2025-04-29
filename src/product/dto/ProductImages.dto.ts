import { IsNotEmpty, IsUrl } from "class-validator";

export class ProductImages {
    @IsUrl(undefined, {
        message: "Image url is a required field"
    })
    url: string;
    
    @IsNotEmpty({
        message: "image description is a required field"
    })
    description: string;
}