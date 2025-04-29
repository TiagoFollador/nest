import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPositive, IsUUID, MaxLength } from 'class-validator';
import { ProductCharacteristicsDTO } from './ProductCharacteristics.dto';
import { ProductImages } from './ProductImages.dto';

export class CreateProductDTO {

  @IsUUID(undefined, {
    message: "user id is a required field",
  })
  userId: string;

  @IsNotEmpty({
    message: 'Name is a required field',
  })
  name: string;

  @IsPositive({
    message: 'Price must be a positive number',
  })
  @IsNumber(
    {},
    {
      message: 'Price must be a number',
    },
  )
  value: number;

  @IsPositive({
    message: 'Quantity must be a positive number',
  })
  @IsNumber(undefined, {
    message: 'Quantity must be a number',
  })
  quantitie: number;

  @IsNotEmpty({
    message: 'Description is a required field',
  })
  @MaxLength(255, {
    message: 'Description must be less than 1000 characters',
  })
  description: string;

  @IsArray({
    message: 'Characteristics must be an array',
  })
  @ArrayMinSize(3, {
    message: 'Product must have at least 3 characteristics',
  })
  characteristics: ProductCharacteristicsDTO[];

  @IsArray({
    message: 'Images must be an array',
  })
  @ArrayMinSize(1, {
    message: 'Product must have at least 1 image',
  })
  images: ProductImages[];

  @IsNotEmpty({
    message: 'Category is a required field',
  })
  category: string;
}
