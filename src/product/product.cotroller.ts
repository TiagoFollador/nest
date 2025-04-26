import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductRepository } from "./product.repository";

@Controller('/products')
export class ProductController {

    constructor(private productRepository: ProductRepository) {}

    @Post()
    async createProduct(@Body() productData) {
        this.productRepository.save(productData);

        return {
            message: "Product created",
            product: productData
        };
    }

    @Get()
    async listProducts() {
        const data = {
            products: this.productRepository.list()
        };
        return data;
    }
}