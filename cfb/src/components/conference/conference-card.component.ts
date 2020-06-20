import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'conference-card',
  templateUrl: './conference-card.component.html',
  styleUrls: ['./conference-card.component.scss'],
})
export class ConferenceCardComponent {
  @Input() gamesList: Game[];
  @Input() title: string;
}
