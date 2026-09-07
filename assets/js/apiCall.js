import { setCurrentWeather, setWeatherForecast} from './setContent.js';
const searchBttn = document.querySelector("#search-bttn");
searchBttn.addEventListener('click', getWeather);
async function weathearApi(lat, lon){
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&forecast_days=7&daily=temperature_2m_mean,temperature_2m_max,temperature_2m_min,weather_code&current=temperature_2m,wind_speed_10m,apparent_temperature,relative_humidity_2m,weather_code`)
    const data = await res.json();
    data.daily.temperature_2m_max.shift();
    data.daily.temperature_2m_mean.shift();
    data.daily.temperature_2m_min.shift();
    data.daily.time.shift();
    data.daily.weather_code.shift();
    return {
        current:{
            temp: data.current.temperature_2m.toFixed(1) + " °",
            humidity: data.current.relative_humidity_2m + "%",
            feelsLike: data.current.apparent_temperature.toFixed(1) + " °",
            windSpeed: data.current.wind_speed_10m + 'Km/h',
            code: data.current.weather_code,
        },
        forecast:{
            tempMax: data.daily.temperature_2m_max,
            tempMean: data.daily.temperature_2m_mean,
            tempMin: data.daily.temperature_2m_min,
            date: data.daily.time,
            code: data.daily.weather_code,
        }
    }
}
async function geoApi(cidade){
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`);
    const data = await res.json();
    const results = data.results[0];
    return {
        lat: results.latitude,
        lon: results.longitude
    };
}
async function getWeather(e){
    if(e) e.preventDefault(); 
    try{
        const city = document.querySelector("#input-city").value;
        const latLon = await geoApi(city);
        const weather = await weathearApi(latLon.lat, latLon.lon);
        const current = weather.current;
        const forecast = weather.forecast;
        setCurrentWeather(current.temp, current.feelsLike, current.humidity, current.windSpeed, current.code, city);
        console.log(forecast)
        setWeatherForecast(forecast.tempMax, forecast.tempMin, forecast.tempMean, forecast.date, forecast.code);
    }catch(error){
        alert("Cidade não encontrada. Tente novamente.")
    }
}
document.querySelector("#input-city").value = "Camaçari";
getWeather();