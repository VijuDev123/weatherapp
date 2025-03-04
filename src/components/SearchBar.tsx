import { useState } from "react";

import { useAppDispatch } from "../store/hooks";
import { addCity, fetchWeather } from "../store/weatherSlice";

const SearchBar: React.FC = () => {
    const [city, setCity] = useState("");
    const dispatch = useAppDispatch();

    const handleSearch = () => {
        // Check if the input is not empty or just whitespace before dispatching actions
        if (city.trim()) {
            dispatch(addCity(city)); // Add city to the Redux store
            dispatch(fetchWeather(city)); // Fetch weather data for the city
            setCity(""); // Clear input field after submission
        }
    };

    return (
        <div className="flex gap-2">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city..."
                className="border p-8 rounded"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add City
            </button>
        </div>
    );
};

export default SearchBar;
