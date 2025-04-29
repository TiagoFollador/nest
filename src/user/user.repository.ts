import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  private findUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async emailAlredyCreated(email: string) {
    const user = this.users.find((user) => user.email === email);
    const userNotFound = undefined;
    return user !== undefined ? user : userNotFound;
  }

  async update(id: string, userData: Partial<UserEntity>) {
    const user = this.findUserById(id);

    Object.entries(userData).forEach(([key, value]) => {
      if (key === 'id') return;
      user[key] = value;
    });

    return user;
  }

  async delete(id: string) {
    const currentUser = this.findUserById(id);
    this.users = this.users.filter((user) => user.id !== id);

    return currentUser;
  }
}
