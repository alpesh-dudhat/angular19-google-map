import { Place } from './place.interface';

export interface MapOptions extends google.maps.MapOptions {
    center: google.maps.LatLngLiteral;
    zoom: number;
    mapId: string;
  }

  export interface MapMarkerData {
    id: number;
    place: Place;
    position: google.maps.LatLngLiteral;
    title: string;
    iconUrl?: string;
    color?: string;
    isOrigin?: boolean;
    isDestination?: boolean;
  }