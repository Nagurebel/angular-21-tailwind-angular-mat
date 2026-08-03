import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripCardComponent {
  private route = inject(Router)
  @Input() item: any;


  updateTrip(id: Number) {
    this.route.navigate(['layout/trip', id])
  }

}
