import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/services/AppState';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public get cart() { return AppState.Cart; }

  public get totalSum() {

    var sum = 0.0;
    this.cart.Items.forEach(element => {
      var p = element.product.price * element.amount;
      sum += p;
    });

    return sum;
  }
  constructor() { }

  ngOnInit() {
  }



  CalcMinus(item) {
    if (item.amount < 0) {
      return "alert-danger";
    }
    return "";
  }

}
