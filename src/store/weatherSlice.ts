import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherData } from "../interface/weatherData";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

interface WeatherState {
    cities: string[];
    pinnedCities: string[];
    weatherData: Record<string, WeatherData>;
    status: "idle" | "loading" | "failed" | "succeeded";
    error: string | null;  // Added error to track any API errors
}

const initialState: WeatherState = {
    cities: [],
    pinnedCities: [],
    weatherData: {},
    status: "idle",
    error: null,  // Initialize error state as null
};

// Async thunk to fetch weather data
export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (city: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
            );
            return { city, data: response.data as WeatherData };
        } catch (error) {
            // Handle API and network errors
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.error?.message || "Network error");
            } else {
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
);

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        addCity: (state, action: PayloadAction<string>) => {
            if (!state.cities.includes(action.payload)) {
                state.cities.push(action.payload);
            }
        },
        removeCity: (state, action: PayloadAction<string>) => {
            state.cities = state.cities.filter(city => city !== action.payload);
            state.pinnedCities = state.pinnedCities.filter(city => city !== action.payload); // Remove from pinnedCities if exists
            delete state.weatherData[action.payload];
        },
        pinCity: (state, action: PayloadAction<string>) => {
            if (!state.pinnedCities.includes(action.payload) && state.cities.includes(action.payload)) {
                state.pinnedCities.unshift(action.payload); // Pin city to the top
            }
        },
        unpinCity: (state, action: PayloadAction<string>) => {
            state.pinnedCities = state.pinnedCities.filter(city => city !== action.payload); // Remove city from pinned list
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.status = "loading";
                state.error = null;  // Clear previous errors
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.weatherData[action.payload.city] = action.payload.data;
                state.status = "succeeded";
                state.error = null;  // Clear any errors on successful fetch
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;  // Store the error message
            });
    },
});

export const { addCity, removeCity, pinCity, unpinCity } = weatherSlice.actions;
export default weatherSlice.reducer;
