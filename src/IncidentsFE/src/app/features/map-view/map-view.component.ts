import { Component, OnInit } from '@angular/core';
import L, {
  tileLayer,
  marker,
  circle,
  polygon,
  Map,
  popup,
  PopupOptions,
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
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private earthquakeService: EarthquakesService
  ) {}
  private map!: Map;
  earthquakes: any[] | null = null;
  selectedEarthquake: any | null = null;

  ngOnInit() {
    this.earthquakeService.getEarthquakeList().subscribe((data) => {
      this.earthquakes = data;
    });
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

    const data = {
      title: 'Dynamic Card',
      description: 'This card content is generated dynamically!',
      buttonAction: () => alert('Dynamic button clicked!'),
    };

    // Generate dynamic HTML
    const generatePopupContent = (data: any) => `
      <app-details-popup>
      </app-details-popup>
    `;

    // Add a marker
    // marker([51.5, -0.09]).addTo(this.map).bindPopup(generatePopupContent(data));

    // const customIcon = L.divIcon({
    //   className: 'custom-icon', // Add a class for styling
    //   html: `<div style="background-color: #ff6f61; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: bold;">A</div>`,
    //   iconSize: [30, 30], // Size of the icon
    //   iconAnchor: [15, 15], // Anchor point of the icon
    // });
    L.marker([51.505, -0.09], { icon: customIcon }).addTo(this.map);

    const popupFactory = this.resolver.resolveComponentFactory(
      DetailsPopupComponent
    );
    const popupComponentRef: ComponentRef<DetailsPopupComponent> =
      popupFactory.create(this.injector);

    // Attach the component to Angular's appRef
    this.appRef.attachView(popupComponentRef.hostView);

    // Convert component to HTML
    const popupHtml = popupComponentRef.location.nativeElement;

    const popup = L.popup()
      .setLatLng([51.5, -0.09])
      .setContent(popupHtml)
      .openOn(this.map);
    this.map.addLayer(popup);

    // Cleanup when the popup is closed
    popup.on('remove', () => {
      this.appRef.detachView(popupComponentRef.hostView);
      popupComponentRef.destroy();
    });
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
      .bindPopup(popup);

    // Add a polygon
    polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047],
    ])
      .addTo(this.map)
      .bindPopup('This is a polygon!');
  }

  fetchDetails(id: string) {
    this.earthquakeService.getEarthquakeById(id).subscribe((data) => {
      this.selectedEarthquake = data;
    });
  }
}
