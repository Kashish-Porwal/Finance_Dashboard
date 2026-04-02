import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const records = await this.prisma.financialRecord.findMany({
      where: { isDeleted: false },
    });

    let totalIncome = 0;
    let totalExpenses = 0;

    records.forEach(record => {
      if (record.type === 'INCOME') totalIncome += record.amount;
      if (record.type === 'EXPENSE') totalExpenses += record.amount;
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

    const categoryTotals: Record<string, number> = {};

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
}
