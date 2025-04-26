import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductRepository {
    private products: any = [];

    async save(product) {
        this.products.push(product);
    }

    list() {
        return this.products
    }
}