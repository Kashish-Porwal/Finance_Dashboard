import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
