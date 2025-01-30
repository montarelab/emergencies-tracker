import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapViewComponent } from './features/map-view/map-view.component';
import { ControlPanelComponent } from './features/control-panel/control-panel.component';
import { ControlPanelSavedState, Earthquake, Volcano } from './services/models';
import { EarthquakesService } from './services/earthquakes-service';
import { VolcanoesService } from './services/volcanoes-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ControlPanelComponent, MapViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'IncidentsFE';
  savedSettings: ControlPanelSavedState = this.getDefaultSettings();
  earthquakes: Earthquake[] = [];
  volcanoes: Volcano[] = [];

  constructor(
    private earthquakeService: EarthquakesService,
    private volcanoService: VolcanoesService
  ) {
    // this.savedSettings = ;
  }

  ngOnInit() {
    console.log('settings: ', this.savedSettings);
  }

  applySettings(settings: ControlPanelSavedState) {
    const dateRangeHasChanged =
      this.savedSettings.mode.dateRange != settings.mode.dateRange;

    const modeHasChanged = this.savedSettings.mode.mode != settings.mode.mode;

    this.savedSettings = settings;

    if (modeHasChanged && settings.mode.mode === 'predict') {
      console.log('Unimplemented feature: predict mode');
      return;
    }

    if (dateRangeHasChanged && settings.phenomenons.volcanoes) {
      this.volcanoes = this.fetchVolanoes();
    } else if (!settings.phenomenons.volcanoes) {
      this.volcanoes = [];
    }

    if (dateRangeHasChanged && settings.phenomenons.earthquakes) {
      this.earthquakes = this.fetchEarthquakes();
    } else if (!settings.phenomenons.earthquakes) {
      this.earthquakes = [];
    }
  }

  getDefaultSettings() {
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const defaultState: ControlPanelSavedState = {
      mode: {
        mode: 'current',
        dateRange: {
          from: oneYearAgo,
          to: now,
        },
      },
      phenomenons: {
        volcanoes: true,
        earthquakes: true,
      },
    };
    return defaultState;
  }

  fetchEarthquakes() {
    let earthquakes: Earthquake[] = [];
    this.earthquakeService.getEarthquakeList().subscribe((data) => {
      earthquakes = data.items;
      console.log('Earthquakes data received: ', earthquakes.length);
    });
    return earthquakes;
  }

  fetchVolanoes() {
    let volcanoes: Volcano[] = [];
    this.volcanoService.getVolcanoList().subscribe((data) => {
      volcanoes = data.items;
      console.log('Volcano data received: ', volcanoes.length);
    });
    return volcanoes;
  }
}
