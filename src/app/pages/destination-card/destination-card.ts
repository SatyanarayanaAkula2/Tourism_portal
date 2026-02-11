import { Component, Input } from '@angular/core';
import { Destination } from '../../models/destinations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destination-card',
  imports:[CommonModule],
  templateUrl: './destination-card.html',
  styleUrls: ['./destination-card.css'],
})
export class DestinationCard {
    @Input() destination!: Destination;
}
