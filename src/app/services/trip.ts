import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Trip {
  private http = inject(HttpClient);

  private apiurl = environment.apiUrl;

  // getTrips() {
  //   return this.http.get<{
  //     error: boolean,
  //     message: string,
  //     data: string
  //   }>(`${this.apiurl}/new-post-booking/confirm-pending-list`)
  // }
  getTrips() {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/todos`)
  }

  getTripById(id: number) {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/todos/${id}`)
  }

}
