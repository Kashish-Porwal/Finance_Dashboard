"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary() {
        const records = await this.prisma.financialRecord.findMany({
            where: { isDeleted: false },
        });
        let totalIncome = 0;
        let totalExpenses = 0;
        records.forEach(record => {
            if (record.type === 'INCOME')
                totalIncome += record.amount;
            if (record.type === 'EXPENSE')
                totalExpenses += record.amount;
        });
        return {
            totalIncome,
            totalExpenses,
            netBalance: totalIncome - totalExpenses,
        };
    }
    async getCategoryTotals() {
        const records = await this.prisma.financialRecord.findMany({
            where: { isDeleted: false },
        });
        const categoryTotals = {};
        records.forEach(record => {
            if (!categoryTotals[record.category]) {
                categoryTotals[record.category] = 0;
            }
            categoryTotals[record.category] += record.amount;
        });
        return Object.keys(categoryTotals).map(category => ({
            category,
            totalAmount: categoryTotals[category]
        }));
    }
    async getRecentActivity() {
        return this.prisma.financialRecord.findMany({
            where: { isDeleted: false },
            orderBy: { date: 'desc' },
            take: 5,
        });
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map