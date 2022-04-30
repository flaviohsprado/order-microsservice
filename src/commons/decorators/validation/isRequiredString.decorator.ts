import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export const IsRequiredString = (options?: ApiPropertyOptions) => {
  return applyDecorators(IsString(), IsNotEmpty(), ApiProperty({ ...options }));
};
