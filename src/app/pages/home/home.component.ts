import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import portfolio from '../../data/portfolio.json';
import { SeoService } from '../../core/seo.service';

// UI
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { ChipComponent } from '../../shared/components/chip/chip.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
// Si usás el uploader, descomentá la siguiente línea:
// import { Avatar_uploaderComponent } from '../../shared/components/avatar-uploader/avatar-uploader.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    RouterLink, NgFor, NgIf,
    SectionHeaderComponent, CardComponent, ChipComponent, ButtonComponent,
    // Avatar_uploaderComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private seo = inject(SeoService);

  profile = portfolio.profile;
  skills = portfolio.skills;
  projects = [...portfolio.projects];

  // topProjects evita usar el pipe | slice
  topProjects = this.projects.slice(0, 3);

  langDisplay = this.profile.languages.join(' / ').toUpperCase();

  // Línea de impacto para “Destacados”
  highlightLine(p: any): string {
    const bits: string[] = [];
    if (Array.isArray(p.highlights) && p.highlights.length) bits.push(p.highlights[0]);
    if (p.tech?.includes('OAuth2')) bits.push('OAuth2 multiusuario');
    if (p.tech?.includes('Pinecone')) bits.push('RAG Pinecone');
    return bits.filter(Boolean).join(' • ') || p.summary || '';
  }

  ngOnInit() {
    this.seo.setRouteTags({
      title: 'Inicio — ' + portfolio.seo.title,
      description: portfolio.seo.description
    });
  }
}
