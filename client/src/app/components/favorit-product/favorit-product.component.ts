import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CallApiService } from '../../services/callApi/call-api.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-favorit-product',
  templateUrl: './favorit-product.component.html',
  styleUrls: ['./favorit-product.component.scss']
})
export class FavoritProductComponent implements OnInit {

  public collectionFavoriteProducts: any = [];

  constructor(private productService: ProductService, private callApiService: CallApiService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getFavoriteProducts().then((data:any) => {
      for(let productCode of data){
        this.callApiService.getProductByBarCode(productCode).then((data:any) => {
          console.log(data, "product data");
          this.collectionFavoriteProducts.push(data.product)
        })
      }
    })
  }

  openProductHandler(data: string){
    this.matDialog.open(ProductDetailsComponent, {
      disableClose: false,
      data: data,
      width: '90%',
      panelClass: 'modal-product-container',
    });
  }

  removeFavoriteProduct(product:any){
    const objWithIdIndex = this.collectionFavoriteProducts.findIndex((obj:any) => obj._id === product._id);
    
    this.collectionFavoriteProducts = []
    this.productService.deleteFavoriteProducts(product).then((data:any) => {
      
      this.collectionFavoriteProducts.slice(objWithIdIndex, 1)
      this.productService.getFavoriteProducts().then((data:any) => {
      
        for(let productCode of data){
          this.callApiService.getProductByBarCode(productCode).then((data:any) => {
            this.collectionFavoriteProducts.push(data.product)
          })
        }
      })
     
    })
  }
}
