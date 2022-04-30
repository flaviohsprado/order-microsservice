import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderRequest, CreateOrderResponse } from './proto/order.pb';
import {
  DecreaseStockResponse,
  FindOneResponse,
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
} from './proto/product.pb';

@Injectable()
export class OrderService implements OnModuleInit {
  private productService: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  public onModuleInit(): void {
    this.productService =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  public async createOrder(
    data: CreateOrderRequest,
  ): Promise<CreateOrderResponse> {
    const product: FindOneResponse = await firstValueFrom(
      this.productService.findOne({ id: data.productId }),
    );

    if (product.status >= HttpStatus.NOT_FOUND) {
      return { id: null, error: ['Product not found'], status: product.status };
    } else if (product.data.stock < data.quantity) {
      return {
        id: null,
        error: ['Stock too less'],
        status: HttpStatus.CONFLICT,
      };
    }

    const order: Order = this.repository.create({
      price: product.data.price,
      productId: product.data.id,
      userId: data.userId,
    });

    await this.repository.save(order);

    const decreasedStockData: DecreaseStockResponse = await firstValueFrom(
      this.productService.decreaseStock({
        id: data.productId,
        orderId: order.id,
      }),
    );

    if (decreasedStockData.status === HttpStatus.CONFLICT) {
      // deleting order if decreaseStock fails
      await this.repository.delete(order.id);

      return {
        id: null,
        error: decreasedStockData.error,
        status: HttpStatus.CONFLICT,
      };
    }

    return { id: order.id, error: null, status: HttpStatus.OK };
  }
}
