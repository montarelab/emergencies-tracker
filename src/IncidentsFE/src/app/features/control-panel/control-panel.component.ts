import { Component } from '@angular/core';
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
import { FormControl, FormGroup, FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    FormsModule, // Add FormsModule to imports
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent {
  volcanos = true;
  hurricanes = true;
  earthquakes = true;
  mode = '1'; // Ensure mode is initialized to '1'
  dateRange: FormGroup;

  constructor() {
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    this.dateRange = new FormGroup({
      start: new FormControl(now),
      end: new FormControl(oneYearAgo),
    });
  }

  applyPhenomenons() {
    console.log('Phenomenons applied:', {
      volcanos: this.volcanos,
      hurricanes: this.hurricanes,
      earthquakes: this.earthquakes,
    });
  }

  applyMode() {
    console.log('Mode applied:', {
      mode: this.mode,
      dateRange: this.dateRange.getRawValue(),
    });
  }
}
