import { Injectable, signal, computed } from '@angular/core';
import type { Project } from './project.model';
import raw from '../../data/portfolio.json';

type AnyProject = any;

function sanitize(p: AnyProject): Project {
  return {
    title: String(p.title),
    slug: String(p.slug),
    summary: p.summary ?? '',
    description: Array.isArray(p.description) ? p.description : [],

    // opcionales
    role: p.role ?? undefined,
    impact: p.impact ?? (Array.isArray(p.highlights) ? p.highlights.join(' · ') : undefined),
    tech: Array.isArray(p.tech) ? p.tech : [],

    contributions: Array.isArray(p.contributions) ? p.contributions : undefined,
    highlights: Array.isArray(p.highlights) ? p.highlights : undefined,
    links: p.links ?? undefined,
    images: Array.isArray(p.images) ? p.images : undefined,
    video: p.video ?? undefined,
    status: p.status ?? undefined,
    date: p.date ?? undefined,
    featured: typeof p.featured === 'boolean' ? p.featured : undefined,
    extra: p.extra ?? undefined,
    thumb: p.thumb ?? (Array.isArray(p.images) && p.images[0]) ?? undefined,
  };
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly all = signal<Project[]>(
    ((raw as any).projects ?? []).map(sanitize)
  );

  /** Todos los proyectos (signal) */
  readonly list = computed(() => this.all());

  /** Destacados (toma featured=true; si no hay flag, incluye todos y recorta a 3) */
  readonly featured = computed(() => {
    const arr = this.all();
    const withFlag = arr.filter(p => p.featured === true);
    const base = withFlag.length ? withFlag : arr;
    return base.slice(0, 3);
  });

  /** Lista única de tecnologías para filtros (signal) */
  readonly techList = computed<string[]>(() => {
    const set = new Set<string>();
    for (const p of this.all()) {
      for (const t of p.tech ?? []) set.add(t);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  });

  /** Filtro por tecnología(s). Si no hay selección, devuelve todos. */
  filterByTech(selected?: string[] | string | null): Project[] {
    const arr = this.all();
    if (!selected || (Array.isArray(selected) && selected.length === 0)) return arr;

    const sel = new Set(Array.isArray(selected) ? selected : [selected]);
    return arr.filter(p => (p.tech ?? []).some(t => sel.has(t)));
  }

  bySlug(slug: string): Project | undefined {
    return this.all().find(p => p.slug === slug);
  }
}
