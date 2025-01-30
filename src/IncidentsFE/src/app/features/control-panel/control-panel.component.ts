import { Component, Output, Input, EventEmitter } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ControlPanelModeState,
  ControlPanelPhenomenonsState,
  ControlPanelSavedState as ControlPanelState,
  DateRange,
} from '../../services/models';

@Component({
  selector: 'app-control-panel',
  imports: [
    MatExpansionModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatRadioModule,
    CommonModule,
    MatDatepickerModule,
    // BrowserModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent {
  @Output()
  onSettingsChangedEvent = new EventEmitter<ControlPanelState>();

  @Input()
  defaultSettings!: ControlPanelState;

  volcanos = true;
  hurricanes = true;
  earthquakes = true;
  mode: 'current' | 'predict' = 'current';
  dateRange!: FormGroup;

  ngOnInit() {
    this.volcanos = this.defaultSettings.phenomenons.volcanoes;
    this.earthquakes = this.defaultSettings.phenomenons.earthquakes;
    this.mode = this.defaultSettings.mode.mode;
    this.dateRange = new FormGroup({
      from: new FormControl(this.defaultSettings.mode?.dateRange.from),
      to: new FormControl(this.defaultSettings.mode?.dateRange.to),
    });
  }

  sendOnSetingsChangedEvent() {
    const event = {
      phenomenons: {
        volcanoes: this.volcanos,
        earthquakes: this.earthquakes,
        hurricanes: this.hurricanes,
      },
      mode: {
        mode: this.mode,
        dateRange: {
          from: this.dateRange!.get('from')?.value,
          to: this.dateRange!.get('to')?.value,
        },
      },
    };
    this.onSettingsChangedEvent.emit(event);
  }

  applyPhenomenons() {
    console.log('Phenomenons applied:', {
      volcanos: this.volcanos,
      hurricanes: this.hurricanes,
      earthquakes: this.earthquakes,
    });

    this.sendOnSetingsChangedEvent();
  }

  applyMode() {
    console.log('Mode applied:', {
      mode: this.mode,
      dateRange: this.dateRange!.getRawValue(),
    });

    this.sendOnSetingsChangedEvent();
  }
}
