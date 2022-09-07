import { User } from './user.model';
export declare class UsersServices {
    private userModel;
    constructor(userModel: typeof User);
    create(user: User): Promise<void>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    remove(id: string): Promise<void>;
}
