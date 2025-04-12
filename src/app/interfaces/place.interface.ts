export interface Place {
  id: number;
  name: string;
  category: string;
  priceRange: number;
  rating: number;
  lat: number;
  lng: number;
  image: string;
  description: string;
  actions: {
    bookingUrl: string;
    moreInfo: boolean;
  };
}