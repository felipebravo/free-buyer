import { CreateDeliveryDto } from '../dto/create-delivery.dto';
import { Delivery } from '../entities/delivery.entity';

export interface iDeliveryOrder extends Delivery {
  order: {
    user_id: string;
  };
}

export abstract class DeliveriesRepository {
  abstract create(data: CreateDeliveryDto): Promise<Delivery> | Delivery;
  abstract findOne(
    id: string,
  ): Promise<iDeliveryOrder | undefined> | iDeliveryOrder;
  abstract update(id: string): Promise<Delivery | undefined> | Delivery;
}
