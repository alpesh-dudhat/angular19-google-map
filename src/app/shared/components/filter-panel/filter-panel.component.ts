import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../icons/icon.component';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule,IconComponent],
  templateUrl: './filter-panel.component.html',
})
export class FilterPanelComponent {
  @Input() form!: {
    category: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
    searchQuery: string;
  };

  @Input() minRating: number = 1;

  @Output() apply = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @Output() closeDrawer = new EventEmitter<void>()

  onApply(): void {
    this.apply.emit();
    this.closeDrawer.emit();
  }
  
  onReset(): void {
    this.reset.emit();
    this.closeDrawer.emit();
  }
}
