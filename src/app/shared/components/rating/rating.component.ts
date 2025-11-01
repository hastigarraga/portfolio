import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
@Component({
  selector: 'ui-rating',
  standalone: true,
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  stars = Array.from({length:5});
  @Input() value = 4;
}
