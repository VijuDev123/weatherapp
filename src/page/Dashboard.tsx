import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
    const { cities, weatherData, pinnedCities } = useSelector((state: RootState) => state.weather);

    // Filter out pinned cities from the all cities list to prevent duplicates
    const unpinnedCities = cities.filter(city => !pinnedCities.includes(city));

    return (
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header Section */}
                <div className="text-center mb-8 text-white">
                    <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">Weather Dashboard</h1>
                </div>

                {/* Search Bar Section */}
                <div className="bg-white p-5 rounded-lg shadow-xl mb-8 flex justify-between items-center">
                    <SearchBar />
                </div>

                {/* Weather Cards Layout (Pinned Cities and All Cities) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Pinned Weather Cards Section (Left Column) */}
                    <div className="p-4"> {/* Added padding here */}
                        <h2 className="text-xl font-semibold text-white sm:text-2xl mb-4">Pinned Cities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pinnedCities.length > 0 ? (
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

                    {/* Weather Cards Section (Right Column) */}
                    <div className="p-4"> {/* Added padding here */}
                        <h2 className="text-xl font-semibold text-white sm:text-2xl mb-4">All Cities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {unpinnedCities.length > 0 ? (
                                unpinnedCities.map((city) => (
                                    <WeatherCard
                                        key={city}
                                        city={city}
                                        data={weatherData[city]}
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
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
