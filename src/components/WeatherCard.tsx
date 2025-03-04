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
            <div className="border p-6 rounded bg-white shadow-md"> {/* Increased padding */}
                <h2 className="text-xl font-bold">{city}</h2>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="border p-6 rounded bg-white shadow-md"> {/* Increased padding */}
            <div className="flex justify-between items-center mb-4 mx-4">
                <h2 className="text-xl font-bold ml-4">{city}</h2>
                {/* Button to pin/unpin */}
                <button
                    onClick={() => dispatch(isPinned ? unpinCity(city) : pinCity(city))}
                    className={`text-sm ${isPinned ? "text-blue-500" : "text-gray-500"}`}
                >
                    {isPinned ? "Unpin" : "Pin"}
                </button>
            </div>

            {/* Current Weather Table */}
            <table className="min-w-full table-auto mb-4">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3 px-6 text-sm font-semibold">Condition</th> {/* Increased padding */}
                        <th className="text-left py-3 px-6 text-sm font-semibold">Temperature</th> {/* Increased padding */}
                        <th className="text-left py-3 px-6 text-sm font-semibold">Humidity</th> {/* Increased padding */}
                        <th className="text-left py-3 px-6 text-sm font-semibold">Wind</th> {/* Increased padding */}
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="py-3 px-6 text-sm">{data.current.condition.text}</td> {/* Increased padding */}
                        <td className="py-3 px-6 text-sm">{data.current.temp_c}°C</td> {/* Increased padding */}
                        <td className="py-3 px-6 text-sm">{data.current.humidity}%</td> {/* Increased padding */}
                        <td className="py-3 px-6 text-sm">{data.current.wind_kph} km/h</td> {/* Increased padding */}
                    </tr>
                </tbody>
            </table>

            {/* 5-Day Forecast Table */}
            <h3 className="text-lg font-semibold mb-2">5-Day Forecast:</h3>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3 px-6 text-sm font-semibold">Date</th> {/* Increased padding */}
                        <th className="text-left py-3 px-6 text-sm font-semibold">Temperature</th> {/* Increased padding */}
                        <th className="text-left py-3 px-6 text-sm font-semibold">Condition</th> {/* Increased padding */}
                    </tr>
                </thead>
                <tbody>
                    {data.forecast.forecastday.map((day, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-3 px-6 text-sm">{new Date(day.date).toLocaleDateString()}</td> {/* Increased padding */}
                            <td className="py-3 px-6 text-sm">{day.day.avgtemp_c}°C</td> {/* Increased padding */}
                            <td className="py-3 px-6 text-sm">{day.day.condition.text}</td> {/* Increased padding */}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={() => dispatch(removeCity(city))}
                className="text-red-500 mt-4 text-sm"
            >
                Remove
            </button>
        </div>
    );
};

export default WeatherCard;
