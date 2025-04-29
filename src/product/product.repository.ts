import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  async save(product: ProductEntity) {
    this.products.push(product);
  }

  async list() {
    return this.products;
  }

  async findProductById(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: string, productData: Partial<ProductEntity>) {
    const product = await this.findProductById(id);

    Object.entries(productData).forEach(([key, value]) => {
      if (key === 'id') return;
      product[key] = value;
    });

    return product;
  }

  async delete(id: string) {
    const product = await this.findProductById(id);
    this.products = this.products.filter((product) => product.id !== id);
    
    return product;
  }
}
