import { ProductCharacteristicsDTO } from "./dto/ProductCharacteristics.dto";
import { ProductImages } from "./dto/ProductImages.dto";

export class ProductEntity {
    id: string;
    userId: string;
    name: string;
    value:number;
    quantitie:number;
    description: string;
    characteristics: ProductCharacteristicsDTO[];
    images: ProductImages[];
    category: string;
}