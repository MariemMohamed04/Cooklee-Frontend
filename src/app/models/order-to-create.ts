import { ShipmentDetails } from "./shipment-details";

export class OrderToCreate {
  constructor(
    public clientEmail: string,
    public cartId: string,
    public shipmentDetails: ShipmentDetails
  ) {}
}
