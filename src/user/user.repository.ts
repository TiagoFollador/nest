import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    private users: any = [];

    async save(user) {
        this.users.push(user);
    }

    list() {
       return this.users;
    }

    async emailAlredyCreated(email: string) {
        const user = this.users.find(
            user => user.email === email
        );

        return user !== undefined;
    }
}