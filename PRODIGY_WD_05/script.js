document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '8d6454a89dff871786a0307b0dbebbee'; // Replace with your API key from OpenWeatherMap
    const searchBox = document.getElementById('search-box');
    const searchBtn = document.getElementById('search-btn');
    const currentTemperature = document.querySelector('.temperature .value');
    const climate = document.querySelector('.climate h3');
    const humidity = document.querySelector('.humidity');
    const weatherIcon = document.querySelector('.weather-icon');
    const currentTime = document.querySelector('.date-time .time');
    const currentWeather = document.getElementById('current-weather');
    async function fetchWeatherData(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    }
    function updateWeatherInfo(data) {
        if (!data) return;

        currentTemperature.textContent = Math.round(data.main.temp);
        climate.textContent = data.weather[0].main;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        const weatherCode = data.weather[0].icon;
        weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/w/${weatherCode}.png" alt="Weather Icon">`;
        const now = new Date();
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
        currentTime.textContent = formattedTime;
        updateBackground(data.weather[0].main.toLowerCase());
    }
    function updateBackground(weatherCondition) {
        currentWeather.className = 'current-weather'; // Reset class
        switch (weatherCondition) {
            case 'clear':
                currentWeather.classList.add('clear');
                break;
            case 'clouds':
                currentWeather.classList.add('cloudy');
                break;
            case 'rain':
            case 'drizzle':
                currentWeather.classList.add('rainy');
                break;
            default:
                currentWeather.classList.add('default');
                break;
        }
    }

    // Event listener for search button click
    searchBtn.addEventListener('click', async function () {
        const city = searchBox.value.trim();
        if (city) {
            const weatherData = await fetchWeatherData(city);
            if (weatherData) {
                updateWeatherInfo(weatherData);
            }
        } else {
            alert('Please enter a city name');
        }
    });
});
