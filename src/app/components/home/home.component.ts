import { Component } from '@angular/core';
import newModels from '../../../assets/json/newmodels.json';

interface newModelsInt {
  veh_name: string;
  veh_label: string;
  price: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  private models: newModelsInt[] = newModels;

  getNewModels() {
    return this.models
  }
}
