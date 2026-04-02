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
exports.RecordsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RecordsService = class RecordsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRecordDto, userId) {
        return this.prisma.financialRecord.create({
            data: {
                ...createRecordDto,
                date: new Date(createRecordDto.date),
                createdById: userId,
            },
        });
    }
    async findAll(filterDto) {
        const { category, type, startDate, endDate, search, page = 1, limit = 10 } = filterDto;
        const skip = (page - 1) * limit;
        const where = { isDeleted: false };
        if (category)
            where.category = category;
        if (type)
            where.type = type;
        if (startDate && endDate) {
            where.date = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }
        else if (startDate) {
            where.date = { gte: new Date(startDate) };
        }
        else if (endDate) {
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
    async findOne(id) {
        const record = await this.prisma.financialRecord.findFirst({
            where: { id, isDeleted: false },
            include: { createdBy: { select: { id: true, email: true } } }
        });
        if (!record) {
            throw new common_1.NotFoundException(`Record with ID ${id} not found`);
        }
        return record;
    }
    async update(id, updateRecordDto) {
        await this.findOne(id);
        const data = { ...updateRecordDto };
        if (updateRecordDto.date) {
            data.date = new Date(updateRecordDto.date);
        }
        return this.prisma.financialRecord.update({
            where: { id },
            data,
        });
    }
    async softDelete(id) {
        await this.findOne(id);
        return this.prisma.financialRecord.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
};
exports.RecordsService = RecordsService;
exports.RecordsService = RecordsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecordsService);
//# sourceMappingURL=records.service.js.map