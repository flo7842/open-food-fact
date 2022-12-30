import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { StorageService } from '../../services/storage/storage.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public collectionCategories: any = [];
  public openFoodProduct: any = []
  searchText: string = '';
  searchEmitted: string = ''
  searchLabel: string = "search";
  titlePageProduct: string = ''
  selected = 'option2';
  selectedCat = 'option2';

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private callApiService: CallApiService,
    private matDialog: MatDialog
  ) {

   }

  ngOnInit(): void {
    let categoriesStorage = this.storageService.getItem('categories')

    if(categoriesStorage !== null){
      let parsedCategories = JSON.parse(categoriesStorage)
      for(let category of parsedCategories) {
        this.collectionCategories.push(category);
      }
    } else {
      this.callApiService.getAllCategories().then((data: any) => {
        for(let category of data){
          this.collectionCategories.push(category);
        }
        this.storageService.setToken('categories', JSON.stringify(this.collectionCategories))
      })
    }

    this.callApiService.getProductMostScanned().then((data: any) => {
        for(let product of data.products) {
          this.openFoodProduct.push(product);
        }
        this.titlePageProduct = "Les produits les plus scannés"
    })
  }


  keyDownFunction(event: any){
    this.searchText = event.target.value
    if (event.code === "Enter") {
      this.search(this.searchText);
    }
  }

  search(event:any){
    this.callApiService.getProductByBarCode(this.searchText).then((data:any) => {
      this.openProductHandler(data.product)
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

  selectChangeCategories (event: any){
    this.openFoodProduct = []
    this.callApiService.getProductByCategoryName(event.target.value).then((data: any) => {
        for(let product of data.products) {
          this.openFoodProduct.push(product);
        }
    })
    
    let categoryNameSplit = event.target.value.split('/').pop()

    if(categoryNameSplit.includes("-")){
      categoryNameSplit = categoryNameSplit.replace(/\-/g, " ")
    }
    
    this.titlePageProduct = `Recherche par Catégorie : ${categoryNameSplit.charAt(0).toUpperCase() + categoryNameSplit.slice(1)}`;
  }

  selectChangeHandlerScore (event: any) {
    if(event.value == "ecoScore"){
      this.openFoodProduct = []
      this.callApiService.getProductSortByBestEco().then((data: any) => {
        for(let product of data.products) {
          this.openFoodProduct.push(product);
        }
      })
      this.titlePageProduct = "Les produits avec le meilleur Eco-Score"
    }
    if(event.value == "nutriscore"){
      this.openFoodProduct = []
      this.callApiService.getProductSortByBestNutri().then((data: any) => {
          for(let product of data.products) {
            this.openFoodProduct.push(product);
          }
      })
      this.titlePageProduct = "Les produits avec le meilleur Nutri-Score"
    }
  }

}
