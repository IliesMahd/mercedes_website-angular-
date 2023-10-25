import { Component, ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import models from '../../../assets/json/models.json';

interface Brand {
  name: string;
  logo?: string;
  label?: string;
  icon?: string;
  sanitizedLogo?: SafeResourceUrl;
  data?: any;
}

interface BrandNavCategories {
  name: string;
  label: string;
  data: BrandNavItems[];
}

interface BrandNavItems {
  name: string;
  label: string;
  icon?: string;
  type?: string;
  checked?: boolean;
}

interface Model {
  name: string;
  label: string;
  image: string;
  price: number;
  energy: string;
  variant: string;
  category: string;
  brand: string[];
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
  ) {
    this.setBrandData();
    // this.brands.forEach((brand) => {
    //   if (brand.logo) {
    //     brand.sanitizedLogo = this.sanitizer.bypassSecurityTrustResourceUrl(
    //       brand.logo
    //     );
    //   }
    // });
  }

  private currentData: any = [];

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
    console.log('setCurrentBrand', brand);
    this.currentBrand = brand;
    this.currentData = brand.data;
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
    console.log('Les data ont été ajoutées aux marques', this.brands);
  }

  private brandNavCategories: BrandNavCategories[] = [
    {
      name: 'energy',
      label: "Type d'énergie",
      data: [
        { name: 'electric', label: 'Électrique', type: 'checkbox' },
        { name: 'hybrid', label: 'Hybride', type: 'checkbox' },
      ],
    },
    {
      name: 'variants',
      label: 'Variantes',
      data: [
        {
          name: 'berlines',
          label: 'Berlines',
          type: 'variant',
          icon: '../../../assets/models/icons/coupe.svg',
        },
        {
          name: 'suv',
          label: 'SUV/tout-terrains',
          type: 'variant',
          icon: '../../../assets/models/icons/offroader.svg',
        },
        {
          name: 'breaks',
          label: 'Breaks/Shooting Brakes',
          type: 'variant',
          icon: '../../../assets/models/icons/offroader.svg',
        },
        {
          name: 'compact',
          label: 'Compacte',
          type: 'variant',
          icon: '../../../assets/models/icons/t-model.svg',
        },
        {
          name: 'coupes',
          label: 'Coupés',
          type: 'variant',
          icon: '../../../assets/models/icons/coupe.svg',
        },
        {
          name: 'cabriolets',
          label: 'Cabriolets/Roadsters',
          type: 'variant',
          icon: '../../../assets/models/icons/convertible.svg',
        },
        {
          name: 'monospaces',
          label: 'Monospaces',
          type: 'variant',
          icon: '../../../assets/models/icons/van.svg',
        },
        {
          name: 'camper',
          label: 'Camper',
          type: 'variant',
          icon: '../../../assets/models/icons/van.svg',
        },
      ],
    },
  ];

  public getBrandNavCategories() {
    return this.brandNavCategories;
  }

  public getModelsImage(model: Model) {
    let brand = model.brand[0];
    console.log('getModelsImage', brand, model.category);
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `/assets/vehicles/${brand}/${model.category}/${model.name}.webp`
    );
  }

  // public sanitizeBrandLogo(path: string): SafeResourceUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(
  //     `/assets/brands/${path}`
  //   );
  // }
}
