import { UsersServices } from './users.services';
import { User } from './user.model';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersServices);
    create(user: User): void;
    findAll(): Promise<User[]>;
    findOne(param: any): Promise<User>;
    removeUser(id: string): Promise<void>;
}
