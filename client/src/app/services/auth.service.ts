import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "http://localhost:8000/api/"

  constructor(private httpClient: HttpClient) { }

  signin(email: string, password: string){
    return new Promise((resolve, rejects) => {
      this.httpClient.post(this.url + 'login/', { email: email, password: password }).subscribe((data: any) => {
         if(!data){
          rejects(false)
         }else{
          resolve(data);
         }
      });
    });
  }

  signup(user: any) {
    return new Promise((resolve, rejects) => {
        this.httpClient.post(this.url + 'register/', user).subscribe((data: any) => {
          if(!data){
           rejects(false)
          }else{
           resolve(data);
          }
       });
     });
  } 

}
