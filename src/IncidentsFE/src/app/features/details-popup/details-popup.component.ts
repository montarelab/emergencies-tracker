import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

interface Earthquake {
  id: number;
  name: string;
  description: string;
  longitude: number;
  lattitude: number;
  magnitude: number;
  deaths: number;
  region: string;
}

@Component({
  selector: 'app-details-popup',
  imports: [MatCardModule, MatDivider, MatButtonModule],
  templateUrl: './details-popup.component.html',
  styleUrl: './details-popup.component.scss',
})
export class DetailsPopupComponent {
  @Input() earthquake!: Earthquake;
}
