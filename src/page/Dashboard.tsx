import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
    const { cities, weatherData, pinnedCities, status } = useSelector((state: RootState) => state.weather);

    return (
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header Section */}
                <div className="text-center mb-8 text-white">
                    <h1 className="text-3xl font-semibold">Weather Dashboard</h1>
                    <p className="mt-2 text-lg">Monitor the weather conditions of your favorite cities</p>
                </div>

                {/* Search Bar Section */}
                <div className="bg-white p-5 rounded-lg shadow-xl mb-8 flex justify-between items-center">
                    <SearchBar />
                </div>

                {/* Pinned Weather Cards Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white">Pinned Cities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {status === "loading" ? (
                            <div className="col-span-full text-center text-gray-300">Loading pinned cities...</div>
                        ) : pinnedCities.length > 0 ? (
                            pinnedCities.map((city) => (
                                <WeatherCard
                                    key={city}
                                    city={city}
                                    data={weatherData[city]}
                                    isPinned={true} // Mark this as pinned
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-300">
                                <p>No cities pinned yet. You can pin cities by clicking the pin button.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Weather Cards Section */}
                <div>
                    <h2 className="text-xl font-semibold text-white">All Cities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {status === "loading" ? (
                            <div className="col-span-full text-center text-gray-300">Loading weather data...</div>
                        ) : cities.length > 0 ? (
                            cities.map((city) => (
                                <WeatherCard
                                    key={city}
                                    city={city}
                                    data={weatherData[city] || null} // Handle if data is not available yet
                                    isPinned={false} // Not pinned
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-300">
                                <p>No cities added. Please search for cities above to view weather data.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Error Handling */}
                {status === "failed" && (
                    <div className="mt-4 text-center text-red-500">
                        <p>Failed to fetch weather data. Please try again later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
