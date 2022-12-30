import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  addFavoriteProduct(product: any){
    return new Promise((resolve, rejects) => {
      this.httpClient.post("http://localhost:8000/api/user/products", {product : product._id}, {headers: this.storageService.getHeaders()}).subscribe((data:any) => {
        if(!data){
          rejects(false)
        }else{
          resolve(data);
        }
      })
    })
  }

  getFavoriteProducts(){
    return new Promise((resolve, rejects) => {
      this.httpClient.get("http://localhost:8000/api/user/products", {headers: this.storageService.getHeaders()}).subscribe((data:any) => {
        if(!data){
          rejects(false)
        }else{
          resolve(data);
        }
      })
    })
  }

  deleteFavoriteProducts(product:any){
    return new Promise((resolve, rejects) => {
      this.httpClient.delete("http://localhost:8000/api/user/products", {headers: this.storageService.getHeaders(), body: {product: product._id}}).subscribe((data:any) => {
        if(data){
          resolve(data);
        }
      },(err) =>{
        if(err){
          rejects(err);
        }
    })
    })
  }
}
