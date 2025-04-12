export function getWeatherIcon(code: number): string {
    const iconMap: { [key: number]: string } = {
      0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
      45: '🌫️', 48: '🌫️', 51: '🌦️', 61: '🌧️',
      71: '❄️', 95: '⛈️'
    };
    return iconMap[code] || '🌡️';
  }
  
  export function getWeatherCondition(code: number): string {
    const descriptionMap: { [key: number]: string } = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy',
      3: 'Overcast', 45: 'Foggy', 48: 'Fog', 51: 'Drizzle',
      61: 'Rain', 71: 'Snow', 95: 'Thunderstorm'
    };
    return descriptionMap[code] || 'Unknown';
  }
  