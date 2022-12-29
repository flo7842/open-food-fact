import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private httpClient: HttpClient, private matDialog: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.openFoodProductDetails.push(this.data)
  }

  addToFavorite(){
    this.matDialog.close()
  }

  addTo(categories: any){
    let subCat = categories.split(",").pop()
    let result = subCat.trim().replace(/ /g, "-").toLowerCase()

    this.httpClient.get("https://fr.openfoodfacts.org/categorie/"+result+"?sort_by=nutriscore_score&json=true").subscribe((data: any) => {
      this.substituteCat.push(new SubstitutProductComponent());
      for(let product of data.products){
        console.log(product.packaging, "packaging");
        
        this.substituteProduct.push(product)
      }
    })
    
  }

  onProductSubstituteAdded(eventData: any) {
    this.openFoodProductDetails = []
    this.openFoodProductDetails.push(eventData)
  }

}
