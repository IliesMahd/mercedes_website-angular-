import { Component } from '@angular/core';

interface Brand {
  name: string;
  image?: string;
  label?: string;
  icon?: string;
}

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent {
  private brands: Brand[] = [
    {name: 'all', label: 'Tous les modèles'},
    {name: 'amg', image: 'logo_amg'},
    {name: 'maybach', image: 'logo_maybach'},
    {name: 'new', label: 'Nouveaux modèles', icon: 'fi fi-ss-star'},
  ]

  getBrands() {
    return this.brands
  }
}
