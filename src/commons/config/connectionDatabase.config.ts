/* istanbul ignore file */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import 'dotenv/config';

export const connection: TypeOrmModuleOptions = {
  type: 'postgres',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.ENVIRONMENT === 'prod' ? false : true,
  //logging: 'all',
  //cache: true,
  ssl: process.env.ENVIRONMENT === 'prod',
  extra:
    process.env.ENVIRONMENT === 'prod'
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {},
};
