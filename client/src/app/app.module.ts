import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthService } from './services/auth/auth.service';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardComponent } from './components/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoaderService } from './services/loader/loader.service';
import { LoadingInterceptor } from './loadingInterceptor/loading.interceptor';
import { ModalSignin } from './modal-signin/modal-signin.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { TextTransformPipe } from './pipe/text-transform.pipe';
import { SubstitutProductComponent } from './components/substitut-product/substitut-product.component';
import { CallApiService } from './services/callApi/call-api.service';
import { StorageService } from './services/storage/storage.service';
import { FavoritProductComponent } from './components/favorit-product/favorit-product.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    ModalSignin,
    CardComponent,
    SpinnerComponent,
    ProductDetailsComponent,
    TextTransformPipe,
    SubstitutProductComponent,
    FavoritProductComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    
  ],
  providers: [AuthService, StorageService, CallApiService, LoaderService,  {
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  },{provide: MAT_DIALOG_DATA, useValue: {}}, {
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
