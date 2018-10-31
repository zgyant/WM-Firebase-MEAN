import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.css']
})
export class MaincontentComponent implements OnInit {
userType:any;
userEmail:any;
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {

      this.userType= localStorage.getItem('userType');
      this.userEmail=localStorage.getItem('userEmail');
      console.log(localStorage.getItem('userEmail'));
      // $.ajax({
      //     type: 'GET',
      //     url: '/api/get/notification',
      //     data: { userEmail: this.userEmail },
      //     dataType: 'json',
      //     success: function (data) {
      //       console.log(data);
      //       for(var i=0;i<data.length;i++)
      //       {
      //
      //         if(data[i].is_active==true){
      //          this.msgNotification=data[i].hardware_id;
      //           console.log(data[i].hardware_id);
      //         }
      //       }
      //     }
      // });
  }

}
