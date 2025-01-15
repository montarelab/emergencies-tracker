import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Incident, Earthquake, Volcano } from '../../services/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-popup',
  imports: [CommonModule, MatCardModule, MatDivider, MatButtonModule],
  templateUrl: './details-popup.component.html',
  styleUrl: './details-popup.component.scss',
})
export class DetailsPopupComponent {
  @Input() incident!: Incident;

  isEarthquake(incident: Incident): incident is Earthquake {
    return 'magnitude' in incident;
  }
}
