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
    constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  if(localStorage.getItem('jwtToken'))
  {
     console.log("All the data : "+localStorage.getItem('username'));
    this.username= localStorage.getItem('username');
  }
  else
    {
        this.router.navigate(['login']);

    }
  }
    logout() {
      console.log('dasda');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        this.router.navigate(['']);
    }

}
