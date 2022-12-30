import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product/product.service';
import { SubstitutProductComponent } from '../substitut-product/substitut-product.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public openFoodProductDetails: any = []
  public substituteProduct: any = []
  substituteCat: Array<any> = [];
  noteLabelEco: string = ''
  noteLabelNutri: string = ''
  urlParamsScoreEco: string = ''
  urlParamsScoreNutri: string = ''
  urlParamsScoreDefaut: string = '?sort_by=nutriscore_score'

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private productService: ProductService, 
    private httpClient: HttpClient, 
    private matDialog: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.openFoodProductDetails.push(this.data)
  }

  addToFavorite(product: any){
    this.productService.addFavoriteProduct(product);
    this.matDialog.close();
  }

  getSubstituteProduct(categories: any){
    let subCat = categories.split(",").pop()
    let result = subCat.trim().replace(/ /g, "-").toLowerCase()
    let urlParams = this.urlParamsScoreDefaut
    if(this.urlParamsScoreNutri !== '' && this.urlParamsScoreEco !== ''){
      urlParams = this.urlParamsScoreNutri + this.urlParamsScoreEco
    } else if(this.urlParamsScoreNutri !== '' && this.urlParamsScoreEco == ''){
      urlParams = this.urlParamsScoreNutri
    } else if(this.urlParamsScoreNutri == '' && this.urlParamsScoreEco !== ''){
      urlParams = this.urlParamsScoreEco
    } else {
      urlParams = ""
    }
    this.httpClient.get("https://fr.openfoodfacts.org/categorie/"+result+ urlParams + "&json=true").subscribe((data: any) => {
      this.substituteCat.push(new SubstitutProductComponent());
      for(let product of data.products){
        this.substituteProduct.push(product)
      }
    })
  }

  onProductSubstituteAdded(eventData: any) {
    this.openFoodProductDetails = []
    this.openFoodProductDetails.push(eventData)
  }

  selectChangeHandlerScoreEco(event: any) {
    this.substituteProduct = []
    this.noteLabelEco = "";
    if(event.target.value == ""){
      this.noteLabelEco = "";
    } else {
      this.noteLabelEco += `Eco score ${event.target.value.split('/').pop().toUpperCase()}`;
    }
    this.urlParamsScoreEco = "/" + event.target.value;
  }

  selectChangeHandlerScoreNutri(event: any) {
    this.substituteProduct = []
    this.noteLabelNutri = "";
    if(event.target.value == ""){
      this.noteLabelNutri = "";
    } else {
      this.noteLabelNutri += `Nutri score ${event.target.value.split('/').pop().toUpperCase()}`;
    }
    this.urlParamsScoreNutri = "/" + event.target.value;
  }
}
