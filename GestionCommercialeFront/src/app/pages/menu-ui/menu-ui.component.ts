import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-ui',
  standalone:false,
  templateUrl: './menu-ui.component.html',
  styleUrls: ['./menu-ui.component.css']
})
export class MenuUiComponent {
  isSidebarCollapsed = false; // Tracks whether the sidebar is collapsed

  /**
   * Toggle the sidebar between collapsed and expanded states
   */
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}