import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

}
