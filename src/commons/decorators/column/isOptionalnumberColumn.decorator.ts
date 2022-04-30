import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export const IsOptionalNumberColumn = () => {
  return applyDecorators(
    Column({
      type: 'decimal',
      transformer: {
        from(value: string) {
          return parseFloat(value);
        },
        to(value: number) {
          return value;
        },
      },
      nullable: true,
    }),
    ApiProperty({ type: 'number', nullable: true }),
  );
};
