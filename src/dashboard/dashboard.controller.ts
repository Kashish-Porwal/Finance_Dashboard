import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @Roles('ADMIN', 'ANALYST')
  @ApiOperation({ summary: 'Get total income, expenses, and net balance' })
  getSummary() {
    return this.dashboardService.getSummary();
  }

  @Get('category-totals')
  @Roles('ADMIN', 'ANALYST')
  @ApiOperation({ summary: 'Get total amount per category' })
  getCategoryTotals() {
    return this.dashboardService.getCategoryTotals();
  }

  @Get('recent-activity')
  @Roles('ADMIN', 'ANALYST')
  @ApiOperation({ summary: 'Get 5 most recent activities' })
  getRecentActivity() {
    return this.dashboardService.getRecentActivity();
  }
}
