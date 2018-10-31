import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginData = {username: '', password: ''};
    message = '';
    data: any;

    constructor(private http: HttpClient, private router: Router) {
    }

    login() {
        this.http.post('/api/login', this.loginData).subscribe(resp => {
            this.data = resp;
            localStorage.setItem('jwtToken', this.data.token);
            localStorage.setItem('userEmail', this.data.userDetails.email);
            localStorage.setItem('username', this.data.userName);
            localStorage.setItem('userType',this.data.userDetails.userType);
            localStorage.setItem('fullName',this.data.userDetails.fullName);
            console.log(this.data.userDetails.email);
            this.router.navigate(['/home']);
        }, err => {
            this.message = err.error.msg;
        })
    }


    ngOnInit(){

    }
}
