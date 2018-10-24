import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-binmanagement',
  templateUrl: './binmanagement.component.html',
  styleUrls: ['./binmanagement.component.css']
})
export class BinmanagementComponent implements OnInit {
userType:any;
  constructor(private router:Router) { }

  ngOnInit() {
      this.userType= localStorage.getItem('userType');
      if(this.userType!=='users')
      {
      }else
      {
          this.router.navigate(['/home']);
      }
  }

}
