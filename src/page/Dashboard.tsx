import { useSelector } from "react-redux";

import { RootState } from "../store/store";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
    const { cities, weatherData } = useSelector((state: RootState) => state.weather);

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <SearchBar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {cities.map(city => (
                    <WeatherCard key={city} city={city} data={weatherData[city]} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
