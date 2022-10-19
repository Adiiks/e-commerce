import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  storage: Storage = sessionStorage;
  orderHistoryList: OrderHistory[] = [];

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    const userEmail: string = sessionStorage.getItem('userEmail')!;

    this.orderHistoryService.getOrderHistory(userEmail).subscribe(
      data => this.orderHistoryList = data
    );
  }

}
