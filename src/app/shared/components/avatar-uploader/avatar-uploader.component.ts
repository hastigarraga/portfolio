import { Component, signal, effect } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-avatar-uploader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './avatar-uploader.component.html',
  styleUrl: './avatar-uploader.component.scss'
})
export class Avatar_uploaderComponent {
  avatar = signal<string | null>(localStorage.getItem('avatarDataUrl'));
  dragging = signal(false);

  constructor() {
    effect(() => {
      const v = this.avatar();
      if (v) localStorage.setItem('avatarDataUrl', v);
    });
  }

  // <-- Faltaba este handler
  onImgError(evt: Event) {
    const img = evt.target as HTMLImageElement;
    img.src = '/assets/avatar-fallback.png';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.readFile(file);
  }

  onDragOver(e: DragEvent) { e.preventDefault(); this.dragging.set(true); }
  onDragLeave(e: DragEvent) { e.preventDefault(); this.dragging.set(false); }
  onDrop(e: DragEvent) {
    e.preventDefault(); this.dragging.set(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) this.readFile(file);
  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => { this.avatar.set(String(reader.result)); };
    reader.readAsDataURL(file);
  }

  reset() {
    localStorage.removeItem('avatarDataUrl');
    this.avatar.set(null);
  }
}
