import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.css']
})
export class MaincontentComponent implements OnInit {
userType:any;
  constructor(private router: Router) { }

  ngOnInit() {
      this.userType= localStorage.getItem('userType');
  }

}
