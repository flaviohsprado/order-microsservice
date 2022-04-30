import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connection } from './commons/config/connectionDatabase.config';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...connection,
    }),
    OrderModule,
  ],
})
export class AppModule {}
