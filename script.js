const API_KEY = 'YOUR_API_KEY'; // IMPORTANT: Replace with your actual OpenWeatherMap API Key. This key is exposed in client-side code, so avoid using keys with write access or sensitive permissions.
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q='; // OpenWeatherMap API URL for current weather by city name

// Selecting HTML elements - these are queried once at script load, which is efficient.

let searchBox = document.querySelector("#city-input");
let btn = document.querySelector("#search-button");

let windSpeed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let temp = document.querySelector("#temp");
let weatherConditionElement = document.querySelector("#day"); // Renamed variable for clarity as it represents weather condition, not day of the week

// Main Logic to fetch weather info based on city name

async function getWeather(city) {
    try {
        // Appending units=metric to get temperature in Celsius and wind speed in m/s
        const response = await fetch(API_URL + city + `&units=metric&appid=${API_KEY}`);

        if (!response.ok) {
            // Handle HTTP errors, e.g., city not found, network issues
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Updating HTML elements with fetched data of windspeed, humidity, temperature and weather condition

        windSpeed.textContent = `${data.wind.speed} m/s`; // Added unit for wind speed
        humidity.textContent = `${data.main.humidity}%`; // Added percentage unit
        temp.textContent = `${Math.round(data.main.temp)} °C`; // Rounding temperature for better display
        weatherConditionElement.textContent = `${data.weather[0].main}`; // Updated variable name

    } catch (error) {
        // Display an error message to the user in the UI
        temp.textContent = "Error";
        weatherConditionElement.textContent = "N/A";
        windSpeed.textContent = "N/A";
        humidity.textContent = "N/A";
        alert(`Unable to fetch weather data for "${city}". ${error.message || "Please check the city name and try again."}`); // Provide user feedback
    }
}

// Click Listener In Button triggers getWeather function to get weather info

btn.addEventListener("click", () => {
    let city = searchBox.value.trim(); // Trim whitespace from input
    if (city) { // Only fetch if city input is not empty
        getWeather(city);
    } else {
        // Alert the user to enter a city name
        alert("Please enter a city name."); // Provide user feedback
    }
});