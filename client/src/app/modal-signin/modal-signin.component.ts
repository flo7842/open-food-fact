import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from '../auth/signin/signin.component';

@Component({
  selector: 'app-modal-signin',
  templateUrl: './modal-signin.component.html',
  styleUrls: ['./modal-signin.component.scss']
})
export class ModalSignin implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('user_token') == null){
      this.matDialog.open(SigninComponent, {
        disableClose: true,
        width: '90%',
        height: "auto",
        panelClass: 'my-custom-dialog-class',
        backdropClass: 'backdropBackground'
      });
    }
  }
}
