import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { environment } from 'src/environments/environment';
import { CartTotals } from 'src/app/interfaces/cart.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Input()cartDetail!: CartTotals | null;
  cartDetails!: CartTotals | null;
  siteConfig:any = environment;

  constructor(private cart: CartService){}

  ngOnInit(){
    this.cart.quantityInCart$.subscribe(
      (res:any) => {
        this.cartDetails = {quantity: res.quantity, total: res.total.toFixed(2).toString()};
      }
    )
  }
}

