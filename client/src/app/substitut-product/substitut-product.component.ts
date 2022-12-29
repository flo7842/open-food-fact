import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-substitut-product',
  templateUrl: './substitut-product.component.html',
  styleUrls: ['./substitut-product.component.scss']
})
export class SubstitutProductComponent implements OnInit {
  @Output() substituteProductList = new EventEmitter<any>();
  @Input() substituteProduct: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  productDetailsHandler(product: any){
    this.substituteProductList.emit(product);
  }
}
