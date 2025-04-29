import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductEntity } from './product.entity';
import { ListProductDTO } from './dto/ListProduct.dto';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.userId = productData.userId;
    productEntity.name = productData.name;
    productEntity.value = productData.value;
    productEntity.quantitie = productData.quantitie;
    productEntity.description = productData.description;
    productEntity.characteristics = productData.characteristics;
    productEntity.images = productData.images;
    productEntity.category = productData.category;

    await this.productRepository.save(productEntity);

    const product = new ListProductDTO(
      productEntity.id,
      productEntity.userId,
      productEntity.name,
      productEntity.value,
      productEntity.quantitie,
      productEntity.description,
      productEntity.characteristics,
      productEntity.images,
      productEntity.category,
    );

    return {
      message: 'Product created',
      product: product,
    };
  }

  @Get()
  async listProducts() {
    const savedProducts = await this.productRepository.list();
    const productsList = savedProducts.map(
      (product) =>
        new ListProductDTO(
          product.id,
          product.userId,
          product.name,
          product.value,
          product.quantitie,
          product.description,
          product.characteristics,
          product.images,
          product.category,
        ),
    );

    const data = {
      message: 'Products listed',
      products: productsList,
    };

    return data;
  }

  
}
