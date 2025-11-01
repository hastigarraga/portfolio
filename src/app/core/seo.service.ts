import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import portfolio from '../data/portfolio.json';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private titleSvc = inject(Title);

  setDefault() {
    this.setTags(portfolio.seo.title, portfolio.seo.description, portfolio.seo.ogImage);
  }

  setRouteTags({ title, description, image }: { title: string; description?: string; image?: string }) {
    this.setTags(title, description ?? portfolio.seo.description, image ?? portfolio.seo.ogImage);
  }

  private setTags(title: string, description: string, ogImage: string) {
    this.titleSvc.setTitle(title);

    // Básicos
    this.meta.updateTag({ name: 'description', content: description });

    // Open Graph -> property
    this.meta.updateTag({ property: 'og:title', content: title } as any);
    this.meta.updateTag({ property: 'og:description', content: description } as any);
    this.meta.updateTag({ property: 'og:image', content: ogImage } as any);
    this.meta.updateTag({ property: 'og:type', content: 'website' } as any);

    // Twitter -> name
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });
  }
}
