import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../../interfaces/place.interface';

@Injectable({ providedIn: 'root' })

export class PlacesService {
  constructor(private http: HttpClient) {}

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>('assets/places.json');
  }
}