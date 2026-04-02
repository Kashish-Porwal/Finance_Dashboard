import { IsString, IsNumber, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRecordDto {
  @ApiProperty({ example: 1500.5 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'INCOME', description: 'INCOME or EXPENSE' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'Salary' })
  @IsString()
  category: string;

  @ApiProperty({ example: '2023-10-01T00:00:00Z' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({ example: 'October salary' })
  @IsOptional()
  @IsString()
  notes?: string;
}
