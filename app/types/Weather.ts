export interface Weather {
  lat: number;
  lon: number;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    uvi: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: [
      {
        main: string;
        icon: string;
      },
    ];
  };
  hourly: {
    dt: number;
    temp: number;
    weather: [
      {
        icon: string;
      },
    ];
  }[];
  daily: {
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
    };
    weather: [
      {
        icon: string;
      },
    ];
  }[];
}
