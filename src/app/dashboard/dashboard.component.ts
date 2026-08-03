import { Component, computed, inject, signal } from '@angular/core';
import { TripCardComponent } from '../shared/trip-card/trip-card.component';
import { Trip } from '../services/trip';
import { Encryption } from '../services/encryption';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-dashboard',
  imports: [TripCardComponent, CommonModule, ScrollingModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private encryptionService = inject(Encryption);
  private tripService = inject(Trip)
  loading: boolean = false;

  // Stores API data
  tripData = signal<any[]>([]);

  // Stores search text
  search = signal('');

  // Computed value
  filteredTrips = computed(() => {
    const searchText = this.search().toLowerCase();
    if (!searchText) {
      return this.tripData();
    }
    return this.tripData().filter(trip =>
      trip.title.toLowerCase().includes(searchText)
    );
  });

  ngOnInit(): void {
    this.getTripData();
  }

  getTripData() {
    this.tripService.getTrips().subscribe({
      next: (response) => {
        this.loading = true;
        console.log('Trip data fetched successfully:', response);
        // console.log('Trip data fetched successfully:', this.encryptionService.decrypt(response.data));
        this.tripData.set(response);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching trip data:', error);
      }
    });
  }

}
