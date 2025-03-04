// interface/weatherData.ts
export interface WeatherCondition {
    text: string;
    icon: string;
}

export interface DayForecast {
    date: string;
    day: {
        avgtemp_c: number;  // Average temperature in Celsius
        condition: WeatherCondition;  // Weather condition like 'Sunny', 'Cloudy'
    };
}

export interface WeatherData {
    current: {
        temp_c: number;
        humidity: number;
        wind_kph: number;
        condition: WeatherCondition; // Ensure condition is here

    };
    forecast: {
        forecastday: DayForecast[]; // Array of 5-day forecast data
    };
}
