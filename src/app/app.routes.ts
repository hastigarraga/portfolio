import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Inicio · Portfolio'
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/projects/projects.routes').then(m => m.PROJECTS_ROUTES)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'Sobre mí · Portfolio'
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contacto · Portfolio'
  },
  { path: '**', redirectTo: '' }
];
