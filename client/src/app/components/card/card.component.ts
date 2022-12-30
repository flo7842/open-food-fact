import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';




@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  scrollStrategy: any;
  @Input() openFoodProduct: any = [];
  constructor(private matDialog: MatDialog, public matDialogRef: MatDialogRef<CardComponent>) { 
    
  }

  ngOnInit(): void {
    
  }

  openProductHandler(data: string){
    this.matDialog.open(ProductDetailsComponent, {
      disableClose: false,
      data: data,
      width: '90%',
      panelClass: 'modal-product-container',
    });
  }
}
