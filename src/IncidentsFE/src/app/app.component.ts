import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapViewComponent } from './features/map-view/map-view.component';
import { ControlPanelComponent } from './features/control-panel/control-panel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ControlPanelComponent, MapViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'IncidentsFE';
}
