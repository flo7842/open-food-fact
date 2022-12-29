import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.matDialog.open(ProductDetailsComponent, {
      disableClose: true,
      data: "tt",
      width: '90%',
      height: "auto",
      panelClass: 'my-custom-dialog-class',
      backdropClass: 'backdropBackground' // This is the "wanted" line
    });
  }

}
