import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SigninComponent } from '../auth/signin/signin.component';

@Component({
  selector: 'app-modal-parent',
  templateUrl: './modal-parent.component.html',
  styleUrls: ['./modal-parent.component.scss']
})
export class ModalParentComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('user_token') == null){
      this.matDialog.open(SigninComponent, {
        disableClose: true,
        width: '90%',
        height: "auto",
        panelClass: 'my-custom-dialog-class',
        backdropClass: 'backdropBackground' // This is the "wanted" line
      });
    }
  }
}
