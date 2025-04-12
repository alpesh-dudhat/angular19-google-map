import { Injectable } from '@angular/core';
import { MapOptions } from '../../interfaces/map-options.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly defaultCenter: google.maps.LatLngLiteral = {
    lat: 40.7128,
    lng: -74.0060, // New York City
  };

  getCurrentLocation(): Promise<MapOptions> {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              zoom: 12,
              disableDefaultUI: true,
              clickableIcons: false,
              mapId: "DEMO_MAP_ID",
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            resolve({
              center: this.defaultCenter,
              zoom: 12,
              mapId: "DEMO_MAP_ID",
            });
          }
        );
      } else {
        console.warn('Geolocation not supported');
        resolve({
          center: this.defaultCenter,
          zoom: 12,
          mapId: "DEMO_MAP_ID",
        });
      }
    });
  }

  geocodeAddress(address: string): Promise<google.maps.LatLngLiteral> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng()
          });
        } else {
          reject(`Geocoding failed: ${status}`);
        }
      });
    });
  }
}