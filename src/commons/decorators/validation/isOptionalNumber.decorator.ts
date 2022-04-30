import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export const IsOptionalNumber = (options?: ApiPropertyOptions) => {
  return applyDecorators(
    IsNumber({}),
    ApiProperty({
      required: false,
      ...options,
    }),
  );
};
