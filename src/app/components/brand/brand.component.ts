import { Component } from '@angular/core';
import brandContent from '../../../assets/json/brandcontent.json'

interface brandContent {
  title: string;
  desc: string;
  image: string;
}

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
  private contents: brandContent[] = brandContent

  public getBrandContent() {
    return this.contents
  }
}
