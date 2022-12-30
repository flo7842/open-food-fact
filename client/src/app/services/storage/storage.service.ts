import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getHeaders(){
    const auth_token = localStorage.getItem('user_token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });

    return headers;
  }

  getItem(key: string){
    let result = localStorage.getItem(key)
    return result;
  }

  setToken(key: string, data: any){
    localStorage.setItem(key, data)
  }
}
