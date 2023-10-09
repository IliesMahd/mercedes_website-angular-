import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Link {
  path: string;
  label: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public activeLink: string = 'home';

  constructor(private router: Router) {}

  links: Link[] = [
    { path: 'home', label: 'Accueil' },
    { path: 'models', label: 'Nos modèles' },
    { path: 'brand', label: 'Notre marque' },
    { path: 'contact', label: 'Contactez-nous' },
  ];

  navigate(path: string) {
    this.activeLink = path;
    this.router.navigate([path]);
  }
}
