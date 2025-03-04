import { WeatherData } from "../interface/weatherData";
import { useAppDispatch } from "../store/hooks";
import { removeCity } from "../store/weatherSlice";

interface WeatherCardProps {
    city: string;
    data: WeatherData | null; // Allow data to be null initially
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, data }) => {
    const dispatch = useAppDispatch();

    // Add check to ensure data and data.current are defined
    if (!data || !data.current) {
        return (
            <div className="border p-4 rounded bg-white shadow-md">
                <h2 className="text-xl font-bold">{city}</h2>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="border p-4 rounded bg-white shadow-md">
            <h2 className="text-xl font-bold">{city}</h2>
            <p>Temp: {data.current.temp_c}°C</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Wind: {data.current.wind_kph} km/h</p>
            <button onClick={() => dispatch(removeCity(city))} className="text-red-500 mt-2">
                Remove
            </button>
        </div>
    );
};

export default WeatherCard;
