import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
    userDataNew =
        {
            username: '',
            password: '',
            email:'',
            country:'',
            usertype:'',
            fullname:''
        };
    message = '';
    data: any;
    userType:any;

    constructor(private http: HttpClient, private router: Router) {

    }


  ngOnInit() {
      this.userType= localStorage.getItem('userType');
        if(this.userType!='admin')
        {
            this.router.navigate(['/home']);
        }
      this.allUserList();
        this.randomize();
  }


  allUserList(){
      $('#userTable').DataTable(
          {
              type: "GET",
              dataType:"json",
              "scrollY":        "400px",
              "scrollCollapse": true,
              ajax:{ "url":"/api/users/getAll","dataSrc":""},

              columns: [
                  { "data": "fullName" },
                  { "data": "email" },
                  { "data": "userType" },
                  {"data":"_id","mRender": function ( data, type, row ) {
                          return '<a title="Toggle"  style="color: orangered" class="copyJS" href="user/toggle/'+data+'" >Remove</a>';
                      }}
              ],
          });
  }

    addUser() {
        this.http.post('/api/add/newuser', this.userDataNew).subscribe(res=>{
            $("#userTable").dataTable().fnDestroy();
            this.allUserList();
            this.router.navigate(['/user_management']);
        });


    }
    randomize(){
      var random = Math.random().toString(36).substring(2);

        (<HTMLInputElement>document.getElementById('passwordUser')).value = random;
  }
}

