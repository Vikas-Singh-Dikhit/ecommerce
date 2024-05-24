import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected isDropdownOpen = false;
  openDropdown() {
    try {
      this.isDropdownOpen = !this.isDropdownOpen;
    } catch {
      throw new Error('Method not implemented.');
    }
  }
  switchLanguage(language: string) {
    throw new Error('Method not implemented.');
  }
}
