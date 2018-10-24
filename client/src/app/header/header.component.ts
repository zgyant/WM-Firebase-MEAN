import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

username:any;
userType:any;
fullName:any;

    constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  if(localStorage.getItem('jwtToken'))
  {
    this.username= localStorage.getItem('username');
    this.userType= localStorage.getItem('userType');
    this.fullName= localStorage.getItem('fullName');
  }
  else
    {
        this.router.navigate(['login']);

    }
  }
    logout() {
        console.log('clicked logout');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        this.router.navigate(['']);
    }

}
