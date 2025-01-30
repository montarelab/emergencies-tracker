import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
import { VolcanoesService } from '../../services/volcanoes-service';
import {
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  ComponentRef,
} from '@angular/core';
import { Earthquake, Incident, Volcano } from '../../services/models';

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
export class MapViewComponent implements OnInit, OnChanges {
  @Input()
  earthquakes!: Earthquake[];
  @Input()
  volcanoes!: Volcano[];

  private map!: Map;
  popupFactory: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {
    this.popupFactory = this.resolver.resolveComponentFactory(
      DetailsPopupComponent
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['earthquakes']) {
      console.log('Earthquakes changed');
      this.addIncidenents(this.earthquakes);
    }
    if (changes['volcanoes']) {
      console.log('Volcanoes changed');
      this.addIncidenents(this.volcanoes);
    }
  }

  ngOnInit() {
    this.map = new Map('map').setView([35, 1], 3);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  addIncidenents(incidents: Incident[]) {
    incidents.forEach((incident) => {
      this.addMarker(incident);
    });
  }

  addMarker(incident: Incident) {
    L.marker([incident.longitude, incident.latitude], { icon: customIcon })
      .addTo(this.map)
      .bindPopup(this.createPopup(incident));
  }

  createPopup(incident: Incident): Popup {
    const popupComponentRef: ComponentRef<DetailsPopupComponent> =
      this.popupFactory.create(this.injector);

    popupComponentRef.instance.incident = incident;
    this.appRef.attachView(popupComponentRef.hostView); // Attach the component to Angular's appRef

    const popupHtml = popupComponentRef.location.nativeElement; // Convert component to HTML
    const popup = L.popup().setLatLng([51.5, -0.09]).setContent(popupHtml);

    popup.on('remove', () => {
      this.appRef.detachView(popupComponentRef.hostView);
      popupComponentRef.destroy();
    }); // Cleanup when the popup is closed

    return popup;
  }
}
