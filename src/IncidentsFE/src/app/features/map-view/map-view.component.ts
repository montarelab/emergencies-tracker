import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent {
  ngOnInit(): void {
    (mapboxgl as any).accessToken = 'your_mapbox_access_token';
    this.map = new mapboxgl.Map({
      container: 'map', // ID in HTML
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [0, 0],
      zoom: 2,
    });

    // use popup
    // this.dialog.open(PopupComponent, {
    //   data: { event: selectedEvent },
    // });
  }
}
