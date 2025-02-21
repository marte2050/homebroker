import { OrderStatus, OrderType } from '../entities/order.entity';

export class CreateOrderDto {
  shares: number;
  partials: number;
  price: number;
  type: OrderStatus;
  status: OrderType;
  walletId: string;
  assetId: string;
}
