import { Component, Renderer2, Input, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent implements OnInit {
  @Input() svgPath: string = '';
  @Input() svgClass: string = '';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.loadSVG(this.svgPath);
  }

  private loadSVG(svgPath: string) {
    fetch(svgPath)
      .then((response) => response.text())
      .then((svgContent) => {
        const svg = this.renderer.createElement('svg');
        svg.innerHTML = svgContent;
        this.renderer.appendChild(this.elementRef.nativeElement, svg);
        this.renderer.setAttribute(svg, 'class', this.svgClass);
        console.log('Chargement du fichier SVG :', svgPath)
        
      })
      .catch((error) => {
        console.log('Erreur lors du chargement du fichier SVG :', error);
        console.log('Chemin du fichier SVG :', svgPath);
        
      });
  }
}
