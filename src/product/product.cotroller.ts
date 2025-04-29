import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductEntity } from './product.entity';
import { ListProductDTO } from './dto/ListProduct.dto';
import { v4 as uuid } from 'uuid';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.id = uuid();
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

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    try {
      const product = await this.productRepository.findProductById(id);
      return {
        message: 'Product found sucessfully!',
        product: product
    };
    } catch (error) {
      return {
        message: `Error: ${error.message}`,
        code: 400,
      };
    }
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: CreateProductDTO,
  ) {
    try {
      const updatedProduct = await this.productRepository.update(
        id,
        productData,
      );

      return {
        message: 'Product updated sucessfully!',
        product: updatedProduct,
      };
    } catch (error) {
      return {
        message: `Error: ${error.message}`,
        code: 400,
      };
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    try {
      const deletedProduct = await this.productRepository.delete(id);

      if (deletedProduct) {
        return {
          message: 'Product deleted sucessfully!',
          code: 200,
        };
      }
    } catch (error) {
      return {
        message: `Error: ${error.message}`,
        code: 400,
      };
    }
  }
}
