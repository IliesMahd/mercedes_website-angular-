import { Component } from '@angular/core';

interface BrandContent {
  img: string;
  title: string;
  desc: string;
  path: string;
}

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})

export class BrandComponent {
  private content: BrandContent[] = [
    {img: 'image_1', title: 'Titre 1', desc: 'desc_1', path: 'path_1'},
    {img: 'image_1', title: 'Titre 2', desc: 'desc_1', path: 'path_1'},
    {img: 'image_1', title: 'Titre 3', desc: 'desc_1', path: 'path_1'},
    {img: 'image_1', title: 'Titre 4', desc: 'desc_1', path: 'path_1'},
  ]

  public getBrandContent() {
    return this.content
  }
}
