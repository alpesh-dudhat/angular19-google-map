import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-tools.component.html',
})
export class MapToolsComponent {
  @Input() isRouteMode: boolean = false;
  @Input() hasDirections: boolean = false;

  @Output() toggleRouteMode = new EventEmitter<void>();
  @Output() clearRoute = new EventEmitter<void>();

}
