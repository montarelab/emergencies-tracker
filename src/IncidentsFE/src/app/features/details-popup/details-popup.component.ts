import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details-popup',
  imports: [MatCardModule, MatDivider, MatButtonModule],
  templateUrl: './details-popup.component.html',
  styleUrl: './details-popup.component.scss',
})
export class DetailsPopupComponent {}
