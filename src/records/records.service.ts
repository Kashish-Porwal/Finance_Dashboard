import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { FilterRecordsDto } from './dto/filter-records.dto';

@Injectable()
export class RecordsService {
  constructor(private prisma: PrismaService) {}

  async create(createRecordDto: CreateRecordDto, userId: number) {
    return this.prisma.financialRecord.create({
      data: {
        ...createRecordDto,
        date: new Date(createRecordDto.date),
        createdById: userId,
      },
    });
  }

  async findAll(filterDto: FilterRecordsDto) {
    const { category, type, startDate, endDate, search, page = 1, limit = 10 } = filterDto;
    const skip = (page - 1) * limit;

    const where: any = { isDeleted: false };
    
    if (category) where.category = category;
    if (type) where.type = type;
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      where.date = { gte: new Date(startDate) };
    } else if (endDate) {
      where.date = { lte: new Date(endDate) };
    }
    
    if (search) {
      where.notes = { contains: search };
    }

    const [data, total] = await Promise.all([
      this.prisma.financialRecord.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: { createdBy: { select: { id: true, email: true } } }
      }),
      this.prisma.financialRecord.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const record = await this.prisma.financialRecord.findFirst({
      where: { id, isDeleted: false },
      include: { createdBy: { select: { id: true, email: true } } }
    });
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
    return record;
  }

  async update(id: number, updateRecordDto: UpdateRecordDto) {
    await this.findOne(id); // Check existence
    
    const data: any = { ...updateRecordDto };
    if (updateRecordDto.date) {
      data.date = new Date(updateRecordDto.date);
    }
    
    return this.prisma.financialRecord.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: number) {
    await this.findOne(id);
    return this.prisma.financialRecord.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
