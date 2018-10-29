import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
@Component({
    selector: 'app-binmanagement',
    templateUrl: './binmanagement.component.html',
    styleUrls: ['./binmanagement.component.css']
})
export class BinmanagementComponent  implements OnInit {
    binAssign =
        {
            userEmail: [],
            binTitle:[],
        };
    userType:any;
    constructor(private http: HttpClient, private router: Router) {
    }

    assignUser()
    {

        this.http.post('/api/assign/user', this.binAssign).subscribe(res=>{
            this.router.navigate(['/bin_management']);
        });

    }


    ngOnInit() {

        var allLocation=new Array();
        var allEmail=new Array();
        var allHardware=new Array();

        $.ajax({
            type: 'GET',
            url: '/api/mapdata',
            data: { get_param: 'value' },
            dataType: 'json',
            success: function (data) {
                passData(data);
            }
        });

        $.ajax({
            type: 'GET',
            url: '/api/users/getAll',
            data: { get_param: 'value' },
            dataType: 'json',
            success: function (data) {
                userData(data);
            }
        });
this.binAssign.binTitle=allLocation;
this.binAssign.userEmail=allEmail;
        function passData(data)
        {

            for(var i=0;i<data.length;i++)
            {

                allLocation.push(data[i].location_precint);
                allHardware.push(data[i].hardware_id);
            }

        }

        function userData(data)
        {

            for(var i=0;i<data.length;i++)
            {
                allEmail.push(data[i].email);
            }

        }


    }




}

