import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { IconComponent } from '../../../icons/icon.component';

@Component({
  selector: 'app-map-tools',
  standalone: true,
  imports: [CommonModule,IconComponent],
  templateUrl: './map-tools.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class MapToolsComponent {
  @Input() isRouteMode: boolean = false;
  @Input() hasDirections: boolean = false;

  @Output() toggleRouteMode = new EventEmitter<void>();
  @Output() clearRoute = new EventEmitter<void>();

  showInfo = signal(false);

  onDistanceModeToggle() {
    this.toggleRouteMode.emit();
    if (!this.isRouteMode) {
      this.showInfo.set(true);
      setTimeout(() => this.showInfo.set(false), 3000);
    }
  }

}
