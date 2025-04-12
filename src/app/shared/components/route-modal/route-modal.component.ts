import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-route-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './route-modal.component.html',
})
export class RouteModalComponent {
  @Input() userAddress: string = '';
  @Output() userAddressChange = new EventEmitter<string>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
