import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { FilterRecordsDto } from './dto/filter-records.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('records')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new financial record (Admin only)' })
  create(@Body() createRecordDto: CreateRecordDto, @CurrentUser() user: any) {
    return this.recordsService.create(createRecordDto, user.id);
  }

  @Get()
  @Roles('ADMIN', 'ANALYST')
  @ApiOperation({ summary: 'Get all financial records with filtering and pagination (Admin, Analyst)' })
  findAll(@Query() filterDto: FilterRecordsDto) {
    return this.recordsService.findAll(filterDto);
  }

  @Get(':id')
  @Roles('ADMIN', 'ANALYST')
  @ApiOperation({ summary: 'Get a specific financial record (Admin, Analyst)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recordsService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a financial record (Admin only)' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordsService.update(id, updateRecordDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Soft delete a financial record (Admin only)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recordsService.softDelete(id);
  }
}
