import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderSchema: Model<Order>) {}

  create(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    return this.orderSchema.create({
      asset: createOrderDto.assetId,
      wallet: createOrderDto.walletId,
      price: createOrderDto.price,
      shares: createOrderDto.shares,
      partials: createOrderDto.shares,
      type: createOrderDto.type,
      status: OrderStatus.PENDING,
    });
  }

  findAll(filter: { walletId: string }) {
    const result = this.orderSchema.find({ wallet: filter.walletId });
    return result;
  }

  findOne(id: number) {
    return this.orderSchema.findById(id);
  }
}
