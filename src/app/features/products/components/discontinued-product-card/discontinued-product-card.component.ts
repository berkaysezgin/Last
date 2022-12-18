import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-discontinued-product-card',
  templateUrl: './discontinued-product-card.component.html',
  styleUrls: ['./discontinued-product-card.component.scss']
})
export class DiscontinuedProductCardComponent {
  @Input() product!:any;
  text:string="We will call you"
  @Output() stockAlert=new EventEmitter<string>()
  callAlert(){
    this.stockAlert.emit(this.text)
  }
}
