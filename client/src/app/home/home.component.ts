import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SigninComponent } from '../auth/signin/signin.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public collectionCategories: any = [];

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient
  ) {
    
    
   }
  
  ngOnInit(): void {
    this.httpClient.get("https://fr.openfoodfacts.org/categories.json").subscribe((data: any) => {
      console.log(data.tags, "data");
      
      for(let tag of data.tags) {
        console.log(tag, 'tag');
        this.collectionCategories.push(`Nom: ${tag.name}`);
        // for(let product of tag){

        //   
        // }
      }
    })
  }

}
