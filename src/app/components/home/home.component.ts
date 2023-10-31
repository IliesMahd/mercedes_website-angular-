import { AfterViewInit, Component } from '@angular/core';
import newModels from '../../../assets/json/newmodels.json';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/all';

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

export class HomeComponent implements AfterViewInit{
  private models: newModelsInt[] = newModels;

  public getNewModels() {
    return this.models
  }

  public scrollToDown() {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: '.container-new_models',
        autoKill: false,
      },
    })
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin)
    const element = document.querySelector('.container-new_models');
    console.log(element);
    
    gsap.from(element, {
      x: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 80%',
        toggleActions: 'play none none reverse',
      }
    });
  }
}
