import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LOGIN_KEY, StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn = false;
  menus = [
    { label: 'Home', url: '/home' },
    { label: 'Auth', url: '/auth' },
    { label: 'Events', url: '/events' },
    { label: 'Bookings', url: '/bookings' },
  ];

  constructor(
    private storageServiceObj: StorageService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isLoggedIn = this.storageServiceObj.hasData(LOGIN_KEY)
          ? true
          : false;
      }
    });
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/auth']);
  }
}
