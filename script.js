const API_KEY = "YOUR_API_KEY"; // API KEY
const API_URL = "YOUR_API_URL"; // API URL

// Selecting HTML elements

let searchBox = document.querySelector("#city-input")
let btn = document.querySelector("#search-button")

let windSpeed = document.querySelector("#wind-speed")
let humidity = document.querySelector("#humidity")
let temp = document.querySelector("#temp")
let day = document.querySelector("#day")


// Main Logic to fetch weather info based on city name

async function getWeather(city) {
    try {
        const response = await fetch(API_URL + city + `&appid=${API_KEY}`);
        const data = await response.json();

        console.log(data);

        // Updating HTML elements with fetched data of windspeed, humidity, temperature and weather condition

        windSpeed.textContent = `${data.wind.speed} `;
        humidity.textContent = `${data.main.humidity}`;
        temp.textContent = `${data.main.temp} °C`;
        day.textContent = `${data.weather[0].main} `;

    } catch (error) {
        console.log("Unable to fetch data, error")
    }
}

// Click Listener In Button triggers getWeather function to get weather info

btn.addEventListener("click", () => {
    var city = searchBox.value;
    getWeather(city);
})

