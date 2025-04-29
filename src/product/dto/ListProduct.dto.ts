import { ProductCharacteristicsDTO } from './ProductCharacteristics.dto';
import { ProductImages } from './ProductImages.dto';

export class ListProductDTO {
  constructor(
   readonly id: string,
   readonly userId: string,
   readonly name: string,
   readonly value: number,
   readonly quantitie: number,
   readonly description: string,
   readonly characteristics: ProductCharacteristicsDTO[],
   readonly images: ProductImages[],
   readonly category: string,
  ) {}
}
