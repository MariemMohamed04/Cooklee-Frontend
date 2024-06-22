import { ShipmentDetails } from "./shipment-details";

export class OrderToCreate {
  constructor(
    public cartId: string,
    public shipmentDetails: ShipmentDetails
  ) {}
}
