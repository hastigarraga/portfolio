import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { SeoService } from '../seo.service';
import portfolio from '../../data/portfolio.json';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgOptimizedImage],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  year = new Date().getFullYear();
  avatar = portfolio.profile.avatar || '/assets/avatar-default.webp';

  constructor(private seo: SeoService) {}
  ngOnInit() { this.seo.setDefault(); }

  onImgError(e: Event) {
    (e.target as HTMLImageElement).src = '/assets/avatar-default.webp';
  }
}
