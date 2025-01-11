import { Component, OnInit } from '@angular/core';
import { tileLayer, marker, circle, polygon, Map } from 'leaflet';

import { icon } from 'leaflet';

const customIcon = icon({
  iconUrl: 'path/to/icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

@Component({
  selector: 'app-map-view',
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit {
  private map!: Map;

  ngOnInit() {
    // Initialize the map
    this.map = new Map('map').setView([51.505, -0.09], 13);

    // Add tile layer (light theme for now, switchable to dark theme later)
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // dark theme
    // tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    //   subdomains: 'abcd',
    //   maxZoom: 19
    // }).addTo(this.map);

    // Add a marker
    marker([51.5, -0.09]).addTo(this.map).bindPopup('This is a marker!');

    // add a custom icon
    // marker([51.5, -0.09], { icon: customIcon }).addTo(this.map).bindPopup('Custom Icon!');

    // Add a circle
    circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500,
    })
      .addTo(this.map)
      .bindPopup('This is a circle!');

    // Add a polygon
    polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047],
    ])
      .addTo(this.map)
      .bindPopup('This is a polygon!');
  }
}
