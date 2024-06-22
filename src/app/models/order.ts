import { OrderItem } from "./order-item";
import { ShipmentDetails } from "./shipment-details";

export class Order {
  constructor(
    public id: number,
    public clientEmail: string,
    public cartId: string,
    public shipmentDetails: ShipmentDetails,
    public items: OrderItem[],
    public status: string,
    public subtotal: number,
    public total: number
  ) {}
}
