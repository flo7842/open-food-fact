import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/services/storage/storage.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user: User = {
    email: '',
    password: ''
  };
  form: FormGroup;
  token: string = '';
  errorMsg: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public anyVariable:any, 
    public fb: FormBuilder, 
    private authService: AuthService,
    private storageService: StorageService, 
    private matDialog: MatDialog
  ) {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
    
  }

  ngOnInit(): void {

  }

  signin(){
    this.user.email = this.form.get('email')!.value;
    this.user.password = this.form.get('password')!.value;

    this.authService.signin(this.user.email, this.user.password).then(async(data: any) => {
      this.token = data.access
      this.storageService.setToken('user_token', this.token)
      this.matDialog.closeAll()
    }).catch(async(err) => {
      this.errorMsg = err.error.msg
    })
  }

}
