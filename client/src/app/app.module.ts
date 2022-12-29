import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardComponent } from './card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoaderService } from './services/loader/loader.service';
import { LoadingInterceptor } from './loadingInterceptor/loading.interceptor';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { ModalSignin } from './modal-signin/modal-signin.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { TextTransformPipe } from './pipe/text-transform.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    ModalSignin,
    CardComponent,
    SpinnerComponent,
    ModalProductComponent,
    ProductDetailsComponent,
    TextTransformPipe
  ],
  imports: [
    MatProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [AuthService, LoaderService,  {
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  },{provide: MAT_DIALOG_DATA, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
