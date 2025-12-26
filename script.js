const themeBtn = document.getElementById('themeToggle');

themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
});

const checkWeatherBtn = document.getElementById('checkWeatherBtn');
checkWeatherBtn.addEventListener('click', getWeather);

async function getWeather() {
    const API_KEY = "cd036622db468f3f5317dcb603547991";
    const city = document.getElementById("citySelect").value;

    if (!city) {
        alert("Please select a city.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found!");
            return;
        }

        const time = new Date(data.dt * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });

        document.getElementById("weatherInfo").style.display = "block";
        document.getElementById("time").textContent = "Time: " + time;
        document.getElementById("temp").textContent = "Temperature: " + data.main.temp + "°C";
        document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + "%";
        document.getElementById("condition").textContent = "Condition: " + data.weather[0].main;
        document.getElementById("weatherIcon").innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`;
    } catch (error) {
        alert("Error fetching weather data!");
        console.error(error);
    }
}
