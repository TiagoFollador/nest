import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    private users: any = [];

    async save(user) {
        this.users.push(user);
        console.log(this.users);
    }

    list() {
        console.log(this.users);
       return this.users;
    }
}