import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() openFoodProduct: any = [];
  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  openProductHandler(url: string){
    
    this.matDialog.open(ProductDetailsComponent, {
      disableClose: true,
      data: url,
      width: '90%',
      height: "auto",
      panelClass: 'modal-product-container',
    });
  }
}
