import { Component, inject, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LayoutComponent],
  template: `<app-layout></app-layout>`
})
export class AppComponent {}
