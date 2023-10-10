import { Component } from '@angular/core';

interface LegalLink {
  path: string;
  label: string;
}

interface SocialMedia {
  path: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  private legalLinks: LegalLink[] = [
    { path: '/', label: '© 2023 Mercedes-Benz AG. Tous droits réservés' },
    { path: '/', label: 'Cookies' },
    { path: '/', label: 'Politique de confidentialité' },
    { path: '/', label: 'Mentions légales' },
    { path: 'contact', label: 'Contactez-nous' },
  ]

  private socialMedias: SocialMedia[] = [
    {path: 'www.instagram.com', icon: 'fi fi-brands-facebook'},
    {path: 'www.pinterest.com', icon: 'fi fi-brands-pinterest'},
    {path: 'www.twitter.com', icon: 'fi fi-brands-twitter'},
    {path: 'www.youtube.com', icon: 'fi fi-brands-youtube'},
    {path: 'www.linkedin.com', icon: 'fi fi-brands-linkedin'},
  ]

  getLegalLinks() {
    return this.legalLinks
  }

  getSocialMedias() {
    return this.socialMedias
  }
}
