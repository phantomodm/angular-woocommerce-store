import { Component, ElementRef, OnInit, ViewChildren, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { CartTotals } from './interfaces/cart.interface';
import { CartService } from './services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChildren('attrBtn') attrBtn!: any | ElementRef;
  title = 'angularWooApp';


  constructor(private dom: Renderer2){
  }

  ngOnInit(){

  }
 do(hover=true){
  const value = 'small'
  this.attrBtn.find((c:any) => {
    if (c.nativeElement.dataset.valueId === value.toLocaleLowerCase()) {
      if(!hover){
        console.log(hover)
        this.dom.removeAttribute(c.nativeElement, 'disabled');
      } else {
        console.log(hover)
        this.dom.setAttribute(c, 'disabled', 'true');
      }
    }
  });
 }



}
