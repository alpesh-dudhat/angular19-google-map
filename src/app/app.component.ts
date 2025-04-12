import {
  Component,
  OnInit,
  computed,
  signal,
  WritableSignal,
  ViewChild
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMap, MapAdvancedMarker, MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { LocationService } from './core/services/location.service';
import { Place } from './interfaces/place.interface';
import { MapOptions } from './interfaces/map-options.interface';

// Component imports

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchToolbarComponent } from './shared/components/search-toolbar/search-toolbar.component';
import { MapToolsComponent } from './shared/components/map-tools/map-tools.component';
import { FilterPanelComponent } from './shared/components/filter-panel/filter-panel.component';
import { RouteModalComponent } from './shared/components/route-modal/route-modal.component';
import { MapViewComponent } from './features/map/map-view.component';
import { WeatherService } from './core/services/weather.service';
import { getWeatherIcon, getWeatherCondition } from './shared/utils/weather-utils';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchToolbarComponent,
    MapToolsComponent,
    FilterPanelComponent,
    RouteModalComponent,
    MapViewComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  // UI & filter state
  mapOptions: MapOptions | null = null;
  selectedPlace: Place | null = null;
  showFilters = false;
  showAddressModal = false;

  // Signal states
  places: WritableSignal<Place[]> = signal<Place[]>([]);
  isRouteMode = signal(false);
  selectedOrigin = signal<Place | null>(null);
  selectedDestination = signal<Place | null>(null);
  directionsResults$ = signal<google.maps.DirectionsResult | undefined>(undefined);
  distanceText = signal<string | null>(null);
  durationText = signal<string | null>(null);
  userLocation = signal<google.maps.LatLngLiteral | null>(null);
  routePoints = signal<Place[]>([]);
  searchActive = signal(false);
  searchQueryChanged = new Subject<string>();

  // Form + weather
  userAddress = '';
  minRating = 1;
  filterForm = {
    category: 'all',
    minPrice: 1,
    maxPrice: 100,
    minRating: 1,
    searchQuery: ''
  };
  weather: { temperature?: number; icon?: string; condition?: string } = {};

  appliedFilters = signal({ ...this.filterForm });

  get isRouteModeValue(): boolean {
    return this.isRouteMode();
  }

  @ViewChild('autocompleteInput', { static: false }) autocompleteInput!: any;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  constructor(
    private locationService: LocationService,
    private http: HttpClient,
    private directionsService: MapDirectionsService,
    private weatherService: WeatherService
  ) { }
  

  ngOnInit(): void {
    this.locationService.getCurrentLocation().then((options) => {
      this.mapOptions = options;
    });

    this.http.get<Place[]>('assets/places.json').subscribe({
      next: (places) => this.places.set(places),
      error: (err) => console.error('Failed to load places', err)
    });
  }
  toggleSidebar() {
    this.showFilters = !this.showFilters;
  }
  
  performSearch(): void {
    this.appliedFilters.set({ ...this.filterForm });
  }

  clearSearch(): void {
    this.filterForm.searchQuery = '';
    this.appliedFilters.set({ ...this.filterForm });
  }

  applyFilters(): void {
    this.appliedFilters.set({ ...this.filterForm });
  }

  resetFilters(): void {
    this.filterForm = {
      category: 'all',
      minPrice: 1,
      maxPrice: 100,
      minRating: 1,
      searchQuery: ''
    };
    this.searchActive.set(false);
    this.appliedFilters.set({ ...this.filterForm });
  }

  toggleRouteMode(): void {
    // console.log('AppComponent: toggleRouteMode fired');
    this.isRouteMode.set(!this.isRouteMode());
    this.routePoints.set([]);
    this.directionsResults$.set(undefined);
    this.distanceText.set(null);
    this.durationText.set(null);
  }

  clearRoute(): void {
    // this.isRouteMode.set(false);
    this.routePoints.set([]);
    this.directionsResults$.set(undefined);
    this.distanceText.set(null);
    this.durationText.set(null);
    this.filterForm.searchQuery = '';
  }

  resetRoute(): void {
    this.userAddress = '';
    this.userLocation.set(null);
    this.selectedPlace = null;
    this.directionsResults$.set(undefined);
    this.distanceText.set(null);
    this.durationText.set(null);
    this.showAddressModal = false;
    this.infoWindow?.close();
  }

  openRouteModal(): void {
    this.showAddressModal = true;
    this.infoWindow?.close();
  }



  get hasDirections(): boolean {
    return !!this.directionsResults$();
  }

  filteredPlaces = computed(() => {
    const { category, minPrice, maxPrice, minRating, searchQuery } = this.appliedFilters();
    const lowerQuery = searchQuery.trim().toLowerCase();
    return this.places().filter(p => {
      const matchCategory = category === 'all' || p.category === category;
      const matchPrice = p.priceRange >= minPrice && p.priceRange <= maxPrice;
      const matchRating = p.rating >= minRating;
      const matchQuery =
        p.name.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery);
      return matchCategory && matchPrice && matchRating && (!searchQuery || matchQuery);
    });
  });

  
  onMarkerClick(marker: MapMarker | MapAdvancedMarker, place: Place): void {
  // console.log('[App] onMarkerClick triggered', this.isRouteMode());

  if (this.isRouteMode()) {
    // console.log(' Distance Mode Active');
    const currentPoints = [...this.routePoints()];

    if (currentPoints.length < 2) {
      currentPoints.push(place);
      this.routePoints.set(currentPoints);

      if (currentPoints.length === 2) {
        this.calculateRoute(currentPoints[0], currentPoints[1]);
      }
    }

    return;
  }

  this.selectedPlace = place;
  this.infoWindow?.open(marker); 
}
  
  
  

  fetchWeather(lat: number, lng: number): void {
    this.weatherService.fetchWeather(lat, lng).subscribe({
      next: (res) => {
        const weatherData = res.current_weather;
        this.weather = {
          temperature: weatherData.temperature,
          icon: getWeatherIcon(weatherData.weathercode),
          condition: getWeatherCondition(weatherData.weathercode),
        };
      },
      error: (err) => {
        console.error('Failed to fetch weather:', err);
      }
    });
  }


  confirmUserAddress(): void {
    if (!this.userAddress || !this.selectedPlace) {
      alert('Please enter your location and select a marker.');
      return;
    }

    this.locationService.geocodeAddress(this.userAddress)
      .then((coords) => {
        this.userLocation.set(coords);

        const destination = {
          lat: this.selectedPlace!.lat,
          lng: this.selectedPlace!.lng,
        };

        const request: google.maps.DirectionsRequest = {
          origin: coords,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        this.directionsService.route(request).subscribe((res) => {
          if (res.status === 'OK' && res.result) {
            this.directionsResults$.set(res.result);

            const leg = res.result.routes[0]?.legs[0];
            this.distanceText.set(leg?.distance?.text || null);
            this.durationText.set(leg?.duration?.text || null);
            this.showAddressModal = false;
          } else {
            alert('Route calculation failed.');
          }
        });
      })
      .catch(err => {
        alert('Geocoding failed: ' + err);
      });
  }

  calculateRoute(origin: Place, destination: Place): void {
    const request: google.maps.DirectionsRequest = {
      origin: { lat: origin.lat, lng: origin.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request).subscribe((res) => {
      console.log('Directions result:', res.result);
      if (res.status === 'OK' && res.result) {
        this.directionsResults$.set(res.result);

        const leg = res.result.routes[0]?.legs[0];
        if (leg) {
          this.distanceText.set(leg.distance?.text || null);
          this.durationText.set(leg.duration?.text || null);
        }
      } else {
        console.error('Failed to calculate route', res.status);
      }
    });
  }

}
