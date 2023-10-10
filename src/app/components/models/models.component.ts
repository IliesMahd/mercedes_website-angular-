import { Component } from '@angular/core';

interface Brand {
  name: string;
  logo?: string;
  label?: string;
  icon?: string;
}

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
})
export class ModelsComponent {
  private brands: Brand[] = [
    { name: 'all', label: 'Tous les modèles' },
    { name: 'amg', logo: 'amg.svg' },
    { name: 'maybach', logo: 'maybach.svg' },
    { name: 'new', label: 'Nouveaux modèles', icon: 'fi fi-ss-star' },
  ];

  private currentBrand: Brand = this.brands[0];

  getBrands() {
    return this.brands;
  }

  getCurrentBrand() {
    return this.currentBrand;
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }
}
