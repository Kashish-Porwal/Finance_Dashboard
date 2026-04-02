import { PrismaService } from '../prisma/prisma.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { FilterRecordsDto } from './dto/filter-records.dto';
export declare class RecordsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRecordDto: CreateRecordDto, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        type: string;
        category: string;
        date: Date;
        notes: string | null;
        isDeleted: boolean;
        createdById: number;
    }>;
    findAll(filterDto: FilterRecordsDto): Promise<{
        data: ({
            createdBy: {
                id: number;
                email: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            amount: number;
            type: string;
            category: string;
            date: Date;
            notes: string | null;
            isDeleted: boolean;
            createdById: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<{
        createdBy: {
            id: number;
            email: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        type: string;
        category: string;
        date: Date;
        notes: string | null;
        isDeleted: boolean;
        createdById: number;
    }>;
    update(id: number, updateRecordDto: UpdateRecordDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        type: string;
        category: string;
        date: Date;
        notes: string | null;
        isDeleted: boolean;
        createdById: number;
    }>;
    softDelete(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        type: string;
        category: string;
        date: Date;
        notes: string | null;
        isDeleted: boolean;
        createdById: number;
    }>;
}
