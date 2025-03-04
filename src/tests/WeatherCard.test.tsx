// WeatherCard.test.tsx

import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';
import { Provider } from 'react-redux';
import { WeatherData } from '../interface/weatherData';
import { store } from '../store/store'; // Adjust the path to your store file
import '@testing-library/jest-dom';


// Mocking the WeatherData to be passed to the component
const mockWeatherData: WeatherData = {
    current: {
        condition: { text: 'Clear', icon: 'clear-icon-url' },  // Added icon here
        temp_c: 25,
        humidity: 60,
        wind_kph: 10,
    },
    forecast: {
        forecastday: [
            {
                date: '2025-03-04',
                day: {
                    avgtemp_c: 24,
                    condition: { text: 'Sunny', icon: 'sunny-icon-url' }, // Added icon here
                },
            },
        ],
    },
};

describe('WeatherCard Component', () => {
    it('renders WeatherCard with city and weather data', () => {
        render(
            <Provider store={store}>
                <WeatherCard city="New York" data={mockWeatherData} isPinned={false} />
            </Provider>
        );

        // Check if city name is displayed
        expect(screen.getByText('New York')).toBeInTheDocument();

        // Check if weather condition, temperature, humidity, and wind speed are displayed
        expect(screen.getByText('Clear')).toBeInTheDocument();
        expect(screen.getByText('25°C')).toBeInTheDocument();
        expect(screen.getByText('60%')).toBeInTheDocument();
        expect(screen.getByText('10 km/h')).toBeInTheDocument();
    });

    it('displays loading state when no weather data is available', () => {
        render(
            <Provider store={store}>
                <WeatherCard city="New York" data={null} isPinned={false} />
            </Provider>
        );

        // Check if "Loading..." is displayed when data is missing
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});
