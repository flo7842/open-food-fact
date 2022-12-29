import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public openFoodProductDetails: any = []

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private httpClient: HttpClient, private matDialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.data);
    
    this.openFoodProductDetails.push(this.data)
  }

  addToFavorite(){
    this.matDialog.closeAll()
  }

}
