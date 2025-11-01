import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ProjectService } from './project.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SeoService } from '../../core/seo.service';

@Component({
  standalone: true,
  selector: 'app-project-detail',
  imports: [NgFor, NgIf, CardComponent, SectionHeaderComponent],
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent {
  route = inject(ActivatedRoute);
  ps = inject(ProjectService);
  seo = inject(SeoService);
  project = this.ps.bySlug(this.route.snapshot.paramMap.get('slug')!);

  ngOnInit() {
    if (this.project) {
      this.seo.setRouteTags({ title: `${this.project.title} — Caso`, description: this.project.summary });
    }
  }
}
