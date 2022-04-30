import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export const IsEmailCustom = (options?: ApiPropertyOptions) => {
  return applyDecorators(
    IsOptional(),
    IsString(),
    IsEmail(),
    ApiProperty({ ...options }),
  );
};
