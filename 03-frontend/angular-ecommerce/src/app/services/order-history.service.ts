import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl: string = environment.luv2shopApiUrl + '/orders';

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(userEmail: string): Observable<OrderHistory[]> {
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmail?email=${userEmail}&sort=dateCreated,DESC`;

    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl).pipe(
      map(response => response._embedded.orders));
  }
}

interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[]
  }
}
