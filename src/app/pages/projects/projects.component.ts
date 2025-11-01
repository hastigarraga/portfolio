import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ProjectService } from './project.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { ChipComponent } from '../../shared/components/chip/chip.component';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [NgFor, NgIf, RouterLink, SectionHeaderComponent, CardComponent, ChipComponent],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  constructor(public ps: ProjectService) {}
  techFilter = signal<string | null>(null);
  techs = this.ps.techList;
  list = computed(() => this.ps.filterByTech(this.techFilter()));
  setFilter(t: string | null) { this.techFilter.set(t); }
}
