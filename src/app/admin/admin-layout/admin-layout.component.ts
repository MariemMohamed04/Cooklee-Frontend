import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ActivatedCheffPagesComponent } from '../chef/activated-cheff-pages/activated-cheff-pages.component';
import { NotActivatedChefPagesComponent } from '../chef/not-activated-chef-pages/not-activated-chef-pages.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
  animations: [
    trigger('toggleDropdown', [
      state('collapsed', style({ height: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ]
})
export class AdminLayoutComponent {
  isSidebarActive: boolean = false;
  isDropdownExpanded: { [key: string]: boolean } = {
    chefPages: false,
    meals: false,
    orders: false
  };

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  toggleDropdown(dropdown: string) {
    this.isDropdownExpanded[dropdown] = !this.isDropdownExpanded[dropdown];
  }
}
