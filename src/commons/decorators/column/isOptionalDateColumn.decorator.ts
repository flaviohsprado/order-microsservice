/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { IsDate } from 'class-validator';
import { Column, ColumnOptions } from 'typeorm';

export const IsOptionalDateColumn = (props?: ColumnOptions) => {
  return applyDecorators(
    Column({ type: 'date', nullable: true, ...props }),
    IsDate(),
    ApiProperty(),
  );
};
