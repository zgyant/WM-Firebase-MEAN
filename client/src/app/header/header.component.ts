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
useremail:any;
fullName:any;
data:any;
msgNotification=[];
seenMsg:any;
    constructor(private http: HttpClient, private router: Router) { }
    notSeen()
    {
        this.http
            .get('/api/seen/notification',{params:{userEmail:this.useremail}})
            .subscribe(data => {
                this.seenMsg=true;
                console.log(data);
            });
    }
  ngOnInit() {
  if(localStorage.getItem('jwtToken'))
  {
    this.username= localStorage.getItem('username');
    this.useremail= localStorage.getItem('userEmail');
    this.userType= localStorage.getItem('userType');
    this.fullName= localStorage.getItem('fullName');

      this.http
          .get('/api/get/notification',{params:{userEmail:this.useremail}})
          .subscribe(data => {
              // Read the result field from the JSON response.
              this.msgNotification.push(data);
              console.log(this.msgNotification);
          });

      // $.ajax({
      //     type: 'GET',
      //     url: '/api/get/notification',
      //     data: { userEmail: this.useremail },
      //     dataType: 'json',
      //     success: function (data) {
      //         console.log(data);
      //         for(var i=0;i<data.length;i++)
      //         {
      //             if(data[i].is_active==true){
      //                 this.msgNotification.push(data[i].location_precinct,data[i].hardware_id);
      //
      //                 //console.log(data[i].hardware_id);
      //             }
      //         }
      //     }
      // });
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
        localStorage.removeItem('userType');
        localStorage.removeItem('userEmail');
        this.router.navigate(['']);
    }

}
