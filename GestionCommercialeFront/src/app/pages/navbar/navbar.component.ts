import { Component,ElementRef,HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {constructor(private eRef: ElementRef) {}

showDropdown = false;

toggleDropdown() {
  this.showDropdown = !this.showDropdown;

  if (this.showDropdown) {
    setTimeout(() => {
      const dropdownMenu = document.querySelector('.dropdown-menu') as HTMLElement;
      const rect = dropdownMenu.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      
      // Calculer la largeur du menu déroulant
      const dropdownWidth = rect.width;
      
      // Ajuster le margin-right pour éviter que le menu dépasse de l'écran
      if (rect.right > windowWidth) {
        const newMarginRight = windowWidth - rect.left - dropdownWidth - 10; // 10px pour garder un peu d'espace
        dropdownMenu.style.marginRight = `${newMarginRight}px`;
      } else {
        dropdownMenu.style.marginRight = '10px'; // Valeur par défaut si le menu ne dépasse pas
      }
    }, 0);
  }
}

// Close dropdown if clicked outside
@HostListener('document:click', ['$event'])
handleClickOutside(event: MouseEvent) {
  if (!this.eRef.nativeElement.contains(event.target)) {
    this.showDropdown = false;
  }
}
getInitials(): string {
  const userName = localStorage.getItem('name');
  if (userName) {
    // Extract first two letters
    return userName.slice(0, 2).toUpperCase();
  }
  return '';  // If no name found in localStorage
}
}