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

    constructor(private http: HttpClient, private router: Router) {

    }


  ngOnInit() {
      this.allUserList();
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
                  { "data": "is_active" },
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
      document.getElementById('password').value = random;
  }
}

