import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export const IsOptionalString = (options?: ApiPropertyOptions) => {
  return applyDecorators(
    IsOptional(),
    IsString(),
    ApiProperty({
      required: false,
      ...options,
    }),
  );
};
