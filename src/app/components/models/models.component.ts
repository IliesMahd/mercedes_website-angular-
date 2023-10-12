import { Component, ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Brand {
  name: string;
  logo?: string;
  label?: string;
  icon?: string;
  sanitizedLogo?: SafeResourceUrl;
}

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
})
export class ModelsComponent {
  constructor(
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  private brands: Brand[] = [
    { name: 'all', label: 'Tous les modèles' },
    { name: 'amg', logo: '/assets/brands/amg.svg' },
    { name: 'maybach', logo: '/assets/brands/maybach.svg' },
    { name: 'new', label: 'Nouveaux modèles', icon: 'fi fi-ss-star' },
  ];

  private currentBrand: Brand = this.brands[0];

  public getBrands() {
    return this.brands;
  }

  public getCurrentBrand() {
    return this.currentBrand;
  }

  public setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  // public sanitizeBrandLogo(path: string): SafeResourceUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(
  //     `/assets/brands/${path}`
  //   );
  // }
}
