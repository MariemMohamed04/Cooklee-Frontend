import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShipmentDetails } from '../models/shipment-details';
import { PaymentData } from '../models/payment-data';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  
  private baseUrl = "https://localhost:7212/api/";

  getshipmentDet(email:string ): Observable<ShipmentDetails> {

    const params = new HttpParams().set("email",email);
  
    return this.http.get<ShipmentDetails>(this.baseUrl+"Order/ShipmentDetails", {params});
  }


  getPaymentKey(cartId:string ,orderEmail:string): Observable<string> {
   
    let params = new HttpParams()
  .set('orderEmail', orderEmail)
  .set('cartId', cartId);
 
  
    return this.http.get<string>(this.baseUrl+"Payment",  {params} );
  }

  constructor(public http:HttpClient) { }
}
 