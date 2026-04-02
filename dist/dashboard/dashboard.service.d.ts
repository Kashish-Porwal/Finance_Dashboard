import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getSummary(): Promise<{
        totalIncome: number;
        totalExpenses: number;
        netBalance: number;
    }>;
    getCategoryTotals(): Promise<{
        category: string;
        totalAmount: number;
    }[]>;
    getRecentActivity(): Promise<{
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
    }[]>;
}
