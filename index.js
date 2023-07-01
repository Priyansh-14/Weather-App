const apikey = "4855b88bd827c212eff1d2ac45f029d9";

const weatherDataE1 = document.getElementById("weather_data");

const cityInputE1 = document.getElementById("city_input");

const formE1 = document.querySelector("form");

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputE1.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const respose = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if (!respose.ok) {
            throw new Error("Network Response Was Not OK")
        }

        const data = await respose.json();

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `Feels Like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ];

        weatherDataE1.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

        weatherDataE1.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherDataE1.querySelector(".description").textContent = description;

        weatherDataE1.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");

    } catch (error) {
        weatherDataE1.querySelector(".icon").innerHTML = "";

        weatherDataE1.querySelector(".temperature").textContent = "";

        weatherDataE1.querySelector(".description").textContent = "An Error Happened, Please Try Again Later";

        weatherDataE1.querySelector(".details").innerHTML = "";
    }
}
