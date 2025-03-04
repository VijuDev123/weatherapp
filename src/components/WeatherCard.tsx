import { WeatherData } from "../interface/weatherData";
import { useAppDispatch } from "../store/hooks";
import { removeCity, pinCity, unpinCity } from "../store/weatherSlice"; // import pin/unpin actions

interface WeatherCardProps {
    city: string;
    data: WeatherData | null; // Data can be null before it loads
    isPinned: boolean; // Track if the city is pinned
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, data, isPinned }) => {
    const dispatch = useAppDispatch();

    // Check if data or forecast is undefined or null
    if (!data || !data.current || !data.forecast) {
        return (
            <div className="border p-4 rounded bg-white shadow-md">
                <h2 className="text-xl font-bold">{city}</h2>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="border p-4 rounded bg-white shadow-md">
            <h2 className="text-xl font-bold flex justify-between items-center">
                {city}
                {/* Button to pin/unpin */}
                <button
                    onClick={() => dispatch(isPinned ? unpinCity(city) : pinCity(city))}
                    className={`text-sm ${isPinned ? "text-blue-500" : "text-gray-500"}`}
                >
                    {isPinned ? "Unpin" : "Pin"}
                </button>
            </h2>
            <p>Temp: {data.current.temp_c}°C</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Wind: {data.current.wind_kph} km/h</p>

            <h3 className="mt-4 text-lg font-semibold">5-Day Forecast:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
                {data.forecast.forecastday.map((day, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded shadow">
                        <p>{new Date(day.date).toLocaleDateString()}</p>
                        <p>Temp: {day.day.avgtemp_c}°C</p>
                        <p>{day.day.condition.text}</p>
                    </div>
                ))}
            </div>

            <button onClick={() => dispatch(removeCity(city))} className="text-red-500 mt-2">
                Remove
            </button>
        </div>
    );
};

export default WeatherCard;
