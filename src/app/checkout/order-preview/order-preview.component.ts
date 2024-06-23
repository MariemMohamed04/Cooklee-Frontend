import { Component, Input } from '@angular/core';
import { ShipmentDetails } from '../../models/shipment-details';

@Component({
  selector: 'app-order-preview',
  standalone: true,
  imports: [],
  templateUrl: './order-preview.component.html',
  styleUrl: './order-preview.component.css'
})
export class OrderPreviewComponent {
  @Input() shipmentDetails!: ShipmentDetails;
}