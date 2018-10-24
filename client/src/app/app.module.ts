import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from "jquery";
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { FooterComponent } from './footer/footer.component';
import { LeafletmapComponent } from './leafletmap/leafletmap.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { BinmanagementComponent } from './binmanagement/binmanagement.component';
import  { FormsModule } from '@angular/forms';
//
// const appRoutes: Routes = [
//     {
//         path: 'home',
//         component: HomeComponent,
//         data: { title: 'Dashboard' }
//     },
//     {
//         path: 'login',
//         component: LoginComponent,
//         data: { title: 'Admin Portal | Login' }
//     },
//     { path: '',
//         redirectTo: '/login',
//     }
// ];
@NgModule({

  declarations: [
    AppComponent,LoginComponent, HomeComponent, HeaderComponent, MaincontentComponent, FooterComponent, LeafletmapComponent, UsermanagementComponent, BinmanagementComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule, RouterModule.forRoot([
          {
              path:'login',
              component:LoginComponent
          },
          {
              path:'',
              component:LoginComponent
          },
          {
              path:'home',
              component:HomeComponent
          },
          {
              path:'user_management',
              component:UsermanagementComponent
          },
          {
              path:'bin_management',
              component:BinmanagementComponent,
          }
      ]
          ,
          { useHash: true },
          )
  ],
  providers: [],
  bootstrap: [AppComponent]
}

)
export class AppModule { }
