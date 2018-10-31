import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
declare let L;

@Component({
  selector: 'app-leafletmap',
  templateUrl: './leafletmap.component.html',
  styleUrls: ['./leafletmap.component.css'],
})
export class LeafletmapComponent implements OnInit {
    data: any;
    binAssign:Function;
    interval:any;
    userType:any;
    userEmail:any;

    constructor(private http: HttpClient, private router: Router) {
    }



  ngOnInit() {
      this.userType= localStorage.getItem('userType');
      this.userEmail=localStorage.getItem('userEmail');
this.leafletData();
  }
    binAssignMail()
    {

    }
  leafletData()
  {
      this.http
          .get('/api/get/notification',{params:{userEmail:this.userEmail}})
          .subscribe(data => {
              console.log(data);
          });

      console.log(this.userEmail);
     var addressPoints=new Array();

          $.ajax({
              type: 'GET',
              url: '/api/mapdata',
              dataType: 'json',

              success: function (data) {
                  passData(data);
              }
          });
          var lotlan;

          function passData(data) {
              for(var i=0;i<data.length;i++)
              {


                  console.log(data[i].hardware_id);

                  addressPoints.push([data[i].latitude,data[i].longitude]);
              }
              console.log(addressPoints);
              var lat1 = data[0].latitude;
              var lon1 = data[0].longitude;


              var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                      maxZoom: 18,
                      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
                  }),


                  latlng = L.latLng(lat1,lon1);

              var map = L.map('map', {center: latlng, zoom: 13, layers: [tiles], gestureHandling: 'cooperative'});

              var markers = L.markerClusterGroup();
              var markersLayer = new L.LayerGroup();	//layer contain searched elements

              map.addLayer(markersLayer);

              var controlSearch = new L.Control.Search({
                  position:'topright',
                  layer: markersLayer,
                  initial: false,
                  zoom: 12,
                  marker: false
              });

              map.addControl( controlSearch );

              for (var i = 0; i < addressPoints.length; i++) {
                  var a = addressPoints[i];
                  var free = ((((data[i].capacity) - (data[i].level)) * 100) / (data[i].capacity)).toPrecision(5) + "%";
                  if (localStorage.getItem('userType') !== 'users')
                  {
                      var title = data[i].location_precint+'<br><b>Bin Capacity: </b>'+data[i].capacity+'<br><b>Free: </b>'+free+'<br><b>Last Updated: </b>'+data[i].time+'<div>';
                  }else
                  {
                      var title = data[i].location_precint+'<br><b>Bin Capacity: </b>'+data[i].capacity+'<br><b>Free: </b>'+free+'<br><b>Last Updated: </b>'+data[i].time+'<div></div>';

                  }
                  var BinRed;
                  if(((((data[i].capacity) - (data[i].level)) * 100) / (data[i].capacity))<=20)
                  {
                       BinRed = L.icon({
                          iconUrl: 'https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/Recycle_Bin_Full.png',
                          iconSize: [38, 30], // size of the icon
                      });
                  }
                  if(((((data[i].capacity) - (data[i].level)) * 100) / (data[i].capacity))<80 && ((((data[i].capacity) - (data[i].level)) * 100) / (data[i].capacity))>20)
                  {
                       BinRed = L.icon({
                          iconUrl: 'https://storage.needpix.com/thumbs/garbage-1708863_1280.png',
                          iconSize: [38, 30], // size of the icon
                      });
                  }
                  if(((((data[i].capacity) - (data[i].level)) * 100) / (data[i].capacity))>80)
                  {
                       BinRed = L.icon({
                          iconUrl: 'http://icons.iconarchive.com/icons/papirus-team/papirus-status/512/user-trash-icon.png',
                          iconSize: [38, 40], // size of the icon
                      });
                  }

                  var marker = L.marker(new L.LatLng(a[0], a[1]),{icon: BinRed}, { title: title });
                  marker.bindPopup(title);
                  markers.addLayer(marker);
              }


              map.addLayer(markers);

          }

      }


}
