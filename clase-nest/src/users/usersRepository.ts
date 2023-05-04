import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

export const USERS_REPOSITORY = 'UsersRepository';

export interface UsersRepository {
    createUser(user: CreateUserDto): Promise<User>
    getUsers(): Promise<User[]>
    getUserById(id: string): Promise<User>
}