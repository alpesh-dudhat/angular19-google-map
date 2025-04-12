import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
}
