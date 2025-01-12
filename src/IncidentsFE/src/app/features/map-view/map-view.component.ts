import { Component, OnInit } from '@angular/core';
import L, {
  tileLayer,
  marker,
  circle,
  polygon,
  Map,
  popup,
  PopupOptions,
  Popup,
} from 'leaflet';
import { MatCardModule } from '@angular/material/card';
import { DetailsPopupComponent } from '../details-popup/details-popup.component';
import { icon } from 'leaflet';
import { MatButtonModule } from '@angular/material/button';
import { EarthquakesService } from '../../services/earthquakes-service';
import {
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  ComponentRef,
} from '@angular/core';

// const popupOptions = new PopupOptions({ maxWidth: 500 });

const incidentIcon = `<div
  class="d-flex"
  style="
    width: 35px;
    height: 35px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 17.5px;
    background: rgba(255, 0, 0, 0.5);
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="#F00"
  >
    <circle cx="7.5" cy="7.5" r="7.5" fill="#FF0000" />
  </svg>
</div>`;

const customIcon = L.divIcon({
  className: '', // Add a class for styling
  html: incidentIcon,
  iconSize: [30, 30], // Size of the icon
  iconAnchor: [15, 15], // Anchor point of the icon
});

@Component({
  selector: 'app-map-view',
  imports: [MatCardModule, DetailsPopupComponent, MatButtonModule],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit {
  popupFactory: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private earthquakeService: EarthquakesService
  ) {
    this.popupFactory = this.resolver.resolveComponentFactory(
      DetailsPopupComponent
    );
  }
  private map!: Map;
  earthquakes: any[] | null = null;
  selectedEarthquake: any | null = null;

  ngOnInit() {
    this.earthquakeService.getEarthquakeList().subscribe((data) => {
      this.earthquakes = data.items;
      console.log('Earthquakes data received: ', this.earthquakes.length);
      this.earthquakes.forEach((earthquake) => {
        this.addMarker(earthquake);
      });
    });
    // Initialize the map
    this.map = new Map('map').setView([51.505, -0.09], 13);

    // Add tile layer (light theme for now, switchable to dark theme later)
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  addMarker(earthquake: any) {
    L.marker([earthquake.longitude, earthquake.latitude], { icon: customIcon })
      .addTo(this.map)
      .bindPopup(this.createPopup(earthquake));
  }

  createPopup(earthquake: any): Popup {
    const popupComponentRef: ComponentRef<DetailsPopupComponent> =
      this.popupFactory.create(this.injector);

    popupComponentRef.instance.earthquake = {
      name: 'Yunnan Tremor 2024',
      description: 'Shook of the northwestern region of China',
      deaths: 52,
      id: 0,
      lattitude: 25.03,
      longitude: 101.54,
      magnitude: 6.8,
      region: 'Yunnan Province, near Dali City',
    };

    // Attach the component to Angular's appRef
    this.appRef.attachView(popupComponentRef.hostView);

    // Convert component to HTML
    const popupHtml = popupComponentRef.location.nativeElement;

    const popup = L.popup().setLatLng([51.5, -0.09]).setContent(popupHtml);

    // this.map.addLayer(popup);

    // Cleanup when the popup is closed
    popup.on('remove', () => {
      this.appRef.detachView(popupComponentRef.hostView);
      popupComponentRef.destroy();
    });

    return popup;
  }

  fetchDetails(id: string) {
    this.earthquakeService.getEarthquakeById(id).subscribe((data) => {
      this.selectedEarthquake = data;
    });
  }
}
