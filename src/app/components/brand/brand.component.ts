import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import brandContent from '../../../assets/json/brandcontent.json';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/all';

interface brandContent {
  title: string;
  desc: string;
  image: string;
  isVisible?: boolean;
}

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  private contents: brandContent[] = brandContent;

  public getBrandContent() {
    return this.contents;
  }

  public scrollToTop() {
    const yOffset = 0; // Position en haut de la page
    const duration = 1; // Durée de l'animation en secondes

    // Utilisez GSAP pour animer le défilement
    gsap.to(window, {
      scrollTo: {
        y: yOffset,
        autoKill: false,
      },
      duration: duration,
      ease: 'power2.inOut', // Courbe d'animation, vous pouvez choisir celle qui vous convient
    });
  }

  public scrollToNextArticle() {
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    const elements = document.querySelectorAll('.content');

    elements.forEach((element, index) => {
      gsap.from(element, {
        x: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'center center',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // // Faire défiler vers le premier .content

    // const firstContent = elements[0] as HTMLElement;
    // if (firstContent) {
    //   const yOffset = firstContent.getBoundingClientRect().top;
    //   console.log(yOffset);
    //   this.scroll(0, yOffset);
    // }
  }
}
