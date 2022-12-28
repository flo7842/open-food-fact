import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(@Inject(MAT_DIALOG_DATA) public anyVariable:any, public fb: FormBuilder, private authService: AuthService, private router: Router, private matDialog: MatDialog) {
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
      console.log(data, "Les data token");
      console.log(this.token, "Les data token");
      localStorage.setItem('user_token', this.token)
      this.matDialog.closeAll()
    }).catch(async(err) => {
      console.log(err);
    })
  }

}
