import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public collectionCategories: any = [];
  public openFoodProduct: any = []
 

  constructor(
    private httpClient: HttpClient
  ) {

   }

  ngOnInit(): void {
    // this.httpClient.get("http://localhost:8000/api/categories").subscribe((data: any) => {
    //   for(let category of data) {
    //     this.collectionCategories.push(category);
    //   }
    // })
    this.httpClient.get("https://fr.openfoodfacts.org/?sort_by=openFoodProduct_score.json").subscribe((data: any) => {
        for(let product of data.products) {
          this.openFoodProduct.push(product);
        }
    })
  }

  selectChangeCategories (event: any){
    this.openFoodProduct = []
    this.httpClient.get(event.target.value + ".json").subscribe((data: any) => {
        for(let product of data.products) {
          this.openFoodProduct.push(product);
        }
    })
  }

  selectChangeHandlerScore (event: any) {
    if(event.target.value == "ecoScore"){
      this.openFoodProduct = []
      this.httpClient.get("https://fr.openfoodfacts.org/?sort_by=ecoscore_score.json").subscribe((data: any) => {
        for(let product of data.products) {
          this.openFoodProduct.push(product);
        }
      })
    }
    if(event.target.value == "openFoodProduct"){
      this.openFoodProduct = []
      this.httpClient.get("https://fr.openfoodfacts.org/?sort_by=openFoodProduct_score.json").subscribe((data: any) => {
          for(let product of data.products) {
            this.openFoodProduct.push(product);
          }
      })
    }
  }

}
