import { AfterViewInit, Component, ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import models from '../../../assets/json/models.json';

interface Brand {
  name: string;
  logo?: string;
  label?: string;
  icon?: string;
  data: Model[];
}

interface Model {
  name: string;
  label: string;
  price: number;
  energy: string;
  category: string;
  isNew: boolean;
  brand: string[];
}

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
})
export class ModelsComponent{
  constructor(private sanitizer: DomSanitizer) {
    this.setBrandData();
  }

  private brands: Brand[] = [
    { name: 'all', label: 'Tous les modèles', data: [] },
    { name: 'amg', label: 'A.M.G', logo: '/assets/brands/amg.svg', data: [] },
    {
      name: 'maybach',
      label: 'Maybach',
      logo: '/assets/brands/maybach.svg',
      data: [],
    },
    { name: 'new', label: 'Nouveaux modèles', icon: 'fi fi-ss-star', data: [] },
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
    this.currentData = brand.data;
    this.selectedEnergies = [];
  }

  private setBrandData() {
    this.brands.forEach((brand) => {
      models.forEach((model) => {
        model.brand.forEach((brandName) => {
          if (brand.name === brandName) {
            brand.data.push(model);
          }
        });
      });
    });
  }

  private currentData: any = this.brands[0].data;

  public getCurrentData() {
    return this.currentData;
  }

  public getBrandVariants() {
    if (this.currentBrand) {
      const uniqueVariants: string[] = [];

      this.currentBrand.data.forEach((model: Model) => {
        if (!uniqueVariants.includes(model.category)) {
          uniqueVariants.push(model.category);
        }
      });
      return uniqueVariants;
    }
    return [];
  }

  public getBrandEnergies() {
    if (this.currentBrand) {
      const uniqueEnergies: string[] = [];

      this.currentBrand.data.forEach((model: Model) => {
        if (!uniqueEnergies.includes(model.energy)) {
          uniqueEnergies.push(model.energy);
        }
      });
      return uniqueEnergies;
    }
    return [];
  }

  public getEnergiesLabel(energy: string) {
    switch (energy) {
      case 'electric':
        return 'Électrique';
      case 'hybrid':
        return 'Hybride';
      default:
        return '';
    }
  }

  public getVariantsIconPath(variant: string) {
    switch (variant) {
      case 'Berlines':
        return '../../../assets/models/icons/coupe.svg';
      case 'SUV':
        return '../../../assets/models/icons/offroader.svg';
      case 'Breaks':
        return '../../../assets/models/icons/offroader.svg';
      case 'Compactes':
        return '../../../assets/models/icons/t-model.svg';
      case 'Coupes':
        return '../../../assets/models/icons/coupe.svg';
      case 'Cabriolets':
        return '../../../assets/models/icons/convertible.svg';
      case 'Monospaces':
        return '../../../assets/models/icons/van.svg';
      case 'Camper':
        return '../../../assets/models/icons/van.svg';
      default:
        return '';
    }
  }

  private selectedEnergies: string[] = [];

  public sortModelsByEnergy(energy: string) {
    if (this.currentBrand) {
      if (this.selectedEnergies.includes(energy)) {
        // Si l'énergie est déjà sélectionnée, la désélectionner
        this.selectedEnergies = this.selectedEnergies.filter(
          (e) => e !== energy
        );
      } else {
        // Sinon, ajouter l'énergie à la liste des énergies sélectionnées
        this.selectedEnergies.push(energy);
      }

      if (this.selectedEnergies.length === 0) {
        // Si aucune énergie n'est sélectionnée, afficher tous les modèles
        this.currentData = this.currentBrand.data;
      } else {
        // Sinon, filtrer les modèles en fonction des énergies sélectionnées
        this.currentData = this.currentBrand.data.filter((model: Model) =>
          this.selectedEnergies.includes(model.energy)
        );
      }
    }
  }

  private currentVariant: string = '';

  public sortModelsByVariant(variant: string) {
    if (this.currentBrand) {
      if (variant === 'all') {
        // Si la variante est "all", afficher tous les modèles
        this.currentData = this.currentBrand.data;
        this.currentVariant = '';
      } else {
        // Sinon, filtrer les modèles en fonction de la variante sélectionnée
        this.currentData = this.currentBrand.data.filter(
          (model: Model) => model.category === variant
        );
        console.log(variant);
        
        this.currentVariant = variant;
      }
    }
  }

  public getCurrentVariant() {
    return this.currentVariant;
  }

  public getModelsImage(model: Model) {
    let brand = model.brand[0];
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `/assets/vehicles/${brand}/${model.category}/${model.name}.webp`
    );
  }
}
