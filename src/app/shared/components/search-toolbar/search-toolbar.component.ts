import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-toolbar.component.html',
})
export class SearchToolbarComponent {
  @Input() query: string = '';
  @Output() queryChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Output() debounced = new EventEmitter<string>();

  showSearchBar = false;

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }
}
