import { Component, inject } from '@angular/core';
import portfolio from '../../data/portfolio.json';
import { CardComponent } from '../../shared/components/card/card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SeoService } from '../../core/seo.service';

@Component({
  standalone: true,
  selector: 'app-about',
  imports: [CardComponent, SectionHeaderComponent],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  seo = inject(SeoService);
  p = portfolio;
  ngOnInit() {
    this.seo.setRouteTags({ title: 'Sobre mí — ' + this.p.seo.title, description: this.p.seo.description });
  }
}
