import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  sending = false;
  ok = false;
  err = false;

  f = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    // honeypot anti-bot (debe quedar vacío)
    website: ['']
  });

  submit() {
    if (this.f.invalid || this.sending) return;
    const v = this.f.value;
    // si el honeypot tiene algo, ni intento
    if ((v.website ?? '').trim().length > 0) return;

    this.sending = true; this.ok = false; this.err = false;

    this.http.post('/api/contact', {
      name: v.name,
      email: v.email,
      message: v.message
    }).subscribe({
      next: () => { this.ok = true; this.f.reset(); },
      error: () => { this.err = true; },
      complete: () => { this.sending = false; }
    });
  }

  get name() { return this.f.controls.name; }
  get email() { return this.f.controls.email; }
  get message() { return this.f.controls.message; }
}
