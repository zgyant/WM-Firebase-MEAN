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
    binThres=
        {
            hardwareName:[],
            binThreshold:"",
            condition:"",
        };
    userType:any;
    constructor(private http: HttpClient, private router: Router) {
    }

    assignUser()
    {

        this.http.post('/api/assign/user', this.binAssign).subscribe(res=>{

            console.log(res);
                this.router.navigate(['/home']);
        });

    }

    assignThres()
    {
        this.http.post('/api/setThres', this.binThres).subscribe(res=>{
            this.router.navigate(['/home']);
        });
    }

    ngOnInit() {

        var allLocation=new Array();
        var allEmail=new Array();
        var allHardware=new Array();
        var thresHard=new Array();

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
this.binThres.hardwareName=thresHard;
this.binAssign.userEmail=allEmail;
        function passData(data)
        {

            for(var i=0;i<data.length;i++)
            {

                allLocation.push(data[i].location_precint);
                allHardware.push(data[i].hardware_id);
                thresHard.push(data[i].location_precint);
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

