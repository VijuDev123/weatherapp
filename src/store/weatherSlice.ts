import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherData } from "../interface/weatherData";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

interface WeatherState {
    cities: string[];
    weatherData: Record<string, WeatherData>; // Using a Record type to store multiple cities
    status: "idle" | "loading" | "failed";
}

const initialState: WeatherState = {
    cities: [],
    weatherData: {},
    status: "idle",
};

// Async thunk to fetch weather data
export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (city: string) => {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`);
        return { city, data: response.data as WeatherData };
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
            delete state.weatherData[action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.weatherData[action.payload.city] = action.payload.data;
                state.status = "idle";
            })
            .addCase(fetchWeather.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { addCity, removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
