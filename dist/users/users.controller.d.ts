import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<Omit<{
        id: number;
        email: string;
        passwordHash: string;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, "passwordHash">[]>;
    updateStatus(id: number, isActive: boolean): Promise<{
        id: number;
        email: string;
        passwordHash: string;
        role: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
