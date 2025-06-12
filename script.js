const API_KEY = '55115d054e2b9746ee5fe4069eaf6273';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// عناصر DOM
const cityElement = document.querySelector('.weather-header h1');
const tempElement = document.querySelector('.temperature');
const dateElement = document.querySelector('.date');
const conditionElement = document.querySelector('.condition');
const cityInput = document.getElementById('cityInput');

// دالة لجلب بيانات الطقس
async function fetchWeatherData(cityName) {
    try {
        const response = await fetch(`${BASE_URL}?q=${cityName}&units=metric&appid=${API_KEY}&lang=ar`);
        
        if (!response.ok) {
            throw new Error('لم يتم العثور على المدينة، الرجاء التأكد من الاسم');
        }
        
        return await response.json();
    } catch (error) {
        console.error('حدث خطأ:', error);
        throw error;
    }
}

function displayWeatherData(data) {
    cityElement.textContent = `${data.name}`;
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    dateElement.textContent = `${day}.${month}.${today.getFullYear()}`;
    
    conditionElement.textContent = data.weather[0].description;
}


async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('الرجاء إدخال اسم المدينة');
        return;
    }
    
    try {
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
        cityInput.value = '';
    } catch (error) {
        alert(error.message);
    }
}


cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});