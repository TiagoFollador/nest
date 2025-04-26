import { Module } from "@nestjs/common";
import { ProductController } from "./product.cotroller";
import { ProductRepository } from "./product.repository";

@Module({
    controllers: [ProductController],
    providers: [ProductRepository],
})
export class ProductsModule {}