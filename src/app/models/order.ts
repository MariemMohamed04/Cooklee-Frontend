import { OrderItem } from "./order-item";
import { ShipmentDetails } from "./shipment-details";

export enum Status {
  Pending = 0,
  OutforDelivery = 1,
  Delivered = 2
}

export class Order {
  constructor(
    public id: number,
    public clientEmail: string,
    public cartId: string,
    public shipmentDetails: ShipmentDetails,
    public items: OrderItem[],
    public status: Status,
    public subtotal: number,
    public total: number
  ) {}
}
