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

    constructor(private http: HttpClient, private router: Router) {
    }

  ngOnInit() {

        var addressPoints=new Array();
      $.ajax({
          type: 'GET',
          url: '/api/mapdata',
          data: { get_param: 'value' },
          dataType: 'json',
          success: function (data) {
             passData(data);
          }
      });
      var lotlan;

      function passData(data) {
    for(var i=0;i<data.length;i++)
    {
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
        var free=(((data[i].capacity)-(data[i].level)/(data[i].capacity)))+"%";
        var title = '<b>Bin Capacity: </b>'+data[i].capacity+'<br><b>Free: </b>'+free+'<br><button class="btn btn-primary" href="#">NOTIFY</button>';
        var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title });
        marker.bindPopup(title);
        markers.addLayer(marker);
    }

    map.addLayer(markers);


}

  }



}
