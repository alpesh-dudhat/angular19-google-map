import { Component, EventEmitter, Input, OnChanges, Output, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleMap,
  GoogleMapsModule,
  MapAdvancedMarker,
  MapInfoWindow,
  MapDirectionsRenderer
} from '@angular/google-maps';
import { MapOptions } from '../../interfaces/map-options.interface';
import { Place } from '../../interfaces/place.interface';
import { WeatherService } from '../../core/services/weather.service';
import { getWeatherCondition, getWeatherIcon } from '../../shared/utils/weather-utils';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, MapInfoWindow, MapDirectionsRenderer],
  templateUrl: './map-view.component.html',
})
export class MapViewComponent implements OnChanges {
  @Input() mapOptions!: MapOptions;
  @Input() places: Place[] = [];
  @Input() selectedPlace: Place | null = null;
  @Input() weather: any;
  @Input() directions!: google.maps.DirectionsResult | undefined;
  @Input() isRouteMode: boolean = false;
  @Output() openRoute = new EventEmitter<void>();
  // @Output() placeSelected = new EventEmitter<Place>();
  @Output() placeSelected = new EventEmitter<{ marker: MapAdvancedMarker; place: Place }>();
  @Output() placeClicked = new EventEmitter<{ place: Place; marker: MapAdvancedMarker }>();

  lastClickedMarker: MapAdvancedMarker | null = null;

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  constructor(private weatherService: WeatherService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPlace'] && this.selectedPlace && !this.isRouteMode) {
      if (this.lastClickedMarker && this.infoWindow) {
        this.infoWindow.open(this.lastClickedMarker);
        this.googleMap?.googleMap?.setCenter(this.lastClickedMarker.position!);
        this.fetchWeather(this.selectedPlace.lat, this.selectedPlace.lng);
      }
    }
  }



  onMarkerClick(place: Place, marker: MapAdvancedMarker) {
    // console.log('[MapView] emitting marker click');
    this.placeClicked.emit({ place, marker });
    this.selectedPlace = place;
  
    const position = { lat: place.lat, lng: place.lng };
    const map = this.googleMap.googleMap;
  
    if (map && marker) {
      map.panTo(position);
  
      google.maps.event.addListenerOnce(map, 'idle', () => {
        this.infoWindow.open(marker);
      });
    }
  
    this.fetchWeather(place.lat, place.lng);
  }
  



  // open(place: Place, marker: MapAdvancedMarker) {
  //   console.log('[MapView] open() called');
  //   console.log('[MapView] isRouteMode at the time of click:', this.isRouteMode);

  //   if (this.isRouteMode) {
  //     console.log('[MapView] Blocked by route mode ✅');
  //     return;
  //   }
  //   console.log('[MapView] Proceeding to emit selected marker ✅');
  //   this.placeSelected.emit({ place, marker })
  //   this.selectedPlace = place;

  //   if (this.infoWindow) {
  //     this.infoWindow.open(marker);
  //   }

  //   const position = marker.position;
  //   if (position && this.googleMap?.googleMap) {
  //     this.googleMap.googleMap.setCenter(position);
  //   }

  //   this.fetchWeather(place.lat, place.lng);
  // }

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
}
