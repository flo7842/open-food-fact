import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: User = {
    email: '',
    password: ''
  };
  form: FormGroup;

  constructor(
    public fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private matDialog: MatDialog) 
  { 
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.matDialog.closeAll()
  }

  signup(){
    this.user.email = this.form.get('email')!.value
    this.user.password = this.form.get('password')!.value
    
    this.authService.signup(this.user)
    .then(async(data: any) => {
      this.router.navigate(['/signin'])
    }).catch(async(err) => {
      console.log(err);
    })
  }

}
