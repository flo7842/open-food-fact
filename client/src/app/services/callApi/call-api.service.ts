import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  public collectionCategories: any = [];
  public openFoodProduct: any = []
  public urlOpenFoodFacts = "https://fr.openfoodfacts.org/"

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }


  getAllCategories(){
    return new Promise((resolve, rejects) => {
    this.httpClient.get("http://localhost:8000/api/categories").subscribe((data: any) => {
        if(!data){
          rejects(false)
         }else{
          resolve(data);
         }
      })
    })
  }

  getProductMostScanned(){
    return new Promise((resolve, rejects) => {
      this.httpClient.get(this.urlOpenFoodFacts + "?sort_by=popularity&json=true").subscribe((data: any) => {
          if(!data){
            rejects(false)
           }else{
            resolve(data);
           }
        })
      })
  }

  getProductSortByBestEco(){
    return new Promise((resolve, rejects) => {
      this.httpClient.get(this.urlOpenFoodFacts + "?sort_by=ecoscore_score&json=true").subscribe((data: any) => {
          if(!data){
            rejects(false)
           }else{
            resolve(data);
           }
        })
      })
  }

  getProductSortByBestNutri(){
    return new Promise((resolve, rejects) => {
      this.httpClient.get(this.urlOpenFoodFacts + "?sort_by=nutriscore_score&json=true").subscribe((data: any) => {
          if(!data){
            rejects(false)
           }else{
            resolve(data);
           }
        })
      })
  }

  getProductByCategoryName(value:string){
    return new Promise((resolve, rejects) => {
      this.httpClient.get(value + "&json=true").subscribe((data: any) => {
          if(!data){
            rejects(false)
           }else{
            resolve(data);
           }
        })
      })
  }

  getProductByBarCode(value:string){
    return new Promise((resolve, rejects) => {
      this.httpClient.get(this.urlOpenFoodFacts + "/api/v0/produit/" + value + "&json=true").subscribe((data: any) => {
          if(!data){
            rejects(false)
           }else{
            resolve(data);
           }
        })
      })
  }
}
