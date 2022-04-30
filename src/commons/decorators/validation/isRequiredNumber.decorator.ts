import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export const IsRequiredNumber = (options?: ApiPropertyOptions) => {
  return applyDecorators(IsNumber(), IsNotEmpty(), ApiProperty({ ...options }));
};
