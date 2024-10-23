const apiKey = 'befd984de4d3c050671d4eb935e6c660';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const getWeatherBtn = document.getElementById('getWeatherBtn');
const spinner = document.getElementById('spinner');
const weatherInfo = document.getElementById('weatherInfo');
const errorMsg = document.getElementById('errorMsg');

getWeatherBtn.addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    
    spinner.style.display = 'block';
    errorMsg.style.display = 'none';
    weatherInfo.style.display = 'none';

    fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('cityName').textContent = data.name;
            const temperature = data.main.temp;
            document.getElementById('temperature').textContent = temperature;

            const tempElement = document.getElementById('temperature');
            if (temperature > 25) {
                tempElement.className = 'text-danger display-4';
            } else if (temperature > 15) {
                tempElement.className = 'text-warning display-4';
            } else {
                tempElement.className = 'text-info display-4';
            }

            document.getElementById('weather').textContent = data.weather[0].description;
            document.getElementById('humidity').textContent = data.main.humidity;
            document.getElementById('windSpeed').textContent = data.wind.speed;
            
            weatherInfo.style.display = 'block';
        })
        .catch(error => {
            errorMsg.textContent = error.message || 'Something went wrong';
            errorMsg.style.display = 'block';
        })
        .finally(() => {
            spinner.style.display = 'none';
        });
});
