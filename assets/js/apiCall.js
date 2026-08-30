const searchBttn = document.querySelector("#search-bttn");
const hour = document.querySelector("#hour");
searchBttn.addEventListener('click', getWeather);
function toCelsius(n){
    return (n - 273.15).toFixed(1)
}
function toKmHour(n){
    return (n * 3.6).toFixed(1);
}
function setWallpaper(clima){
    const body = document.body;
    let img = "";
    switch(clima){
        case("Clouds"):
            img = "lightCloudWallpaper.jpg"; 
            break
        case("Clear"):
            img = "sunWallpaper.jpg";
            break
        case("Thunderstorm"):
        case("Drizzle"):
            img = "cloudyWallpaper.jpg";
            break
        case("Rain"):
            img = "rainWallpaper.jpg";
            break
        default:
            img = "lightCloudWallpaper.jpg"; 
            break   
        }
    const cssDeclaration = `url("./assets/img/${img}")`
    body.style.backgroundImage = cssDeclaration;
    console.log(clima)
}
function setIcon(clima, element){
    let icon = "";
    switch(clima){
        case("Clouds"):
            icon = "iconCloud.png"; 
            break
        case("Clear"):
            icon = "iconClear.png";
            break
        case("Thunderstorm"):
        case("Drizzle"):
            icon = "iconStorm.png";
            break
        case("Rain"):
            icon = "iconRain.png";
            break
        default:
            icon = "iconClear.png"; 
            break   
        } 
        const cssDeclaration = `./assets/img/${icon}`;
        element.setAttribute("src", cssDeclaration)  
}
async function weathearApi(lat, lon){
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ce11a71ed128dbb658dd43707d169cc8`) 
    const data = await res.json();
    return data
}
function getLatAndLon(apiRes){
    return {
        lat: apiRes[0].lat,
        lon: apiRes[0].lon   
    }
}
function getMainWeather(apiRes){
    return {
        temp: toCelsius(apiRes.main.temp),
        feelsLike: toCelsius(apiRes.main.feels_like),
        max: toCelsius(apiRes.main.temp_max),
        min: toCelsius(apiRes.main.temp_min),
        humidity: apiRes.main.humidity + "%"
    }
}
async function geoApi(cidade){
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=ce11a71ed128dbb658dd43707d169cc8`)
    const data = await res.json();
    const latAndLon = getLatAndLon(data)
    return latAndLon;
}
function setContent(weather, mainWeather, windSpeed, city){
    const wind = document.querySelector("#wind-value");
    const feelsLike = document.querySelector("#feels-like-value");
    const humidity = document.querySelector("#humidity-value");
    const tempToday = document.querySelector("#temp-today");
    const cityName = document.querySelector("#city-name");
    const clima = weather.weather[0].main;
    const icon = document.querySelector("#icon-temp-today");
    wind.innerText = toKmHour(windSpeed);
    feelsLike.innerText = mainWeather.feelsLike;
    humidity.innerText = mainWeather.humidity;
    tempToday.innerText = mainWeather.temp;
    cityName.innerText = city;
    setWallpaper(clima)
    setIcon(clima, icon)
}
async function getWeather(e){
    if(e){
        e.preventDefault();    
    }
    const city = document.querySelector("#input-city").value;
    const geoRes = await geoApi(city);
    const weather = await weathearApi(geoRes.lat, geoRes.lon)
    //const forecast = await forecastApi(geoRes.lat, geoRes.lon)
    const mainWeather = getMainWeather(weather);
    const windSpeed = weather.wind.speed;
    setContent(weather, mainWeather, windSpeed, city);
}
function getHour(){
    const today = new Date();
    hour.innerText = `${today.getHours()}:${today.getMinutes()}`
}
async function forecastApi(lat, lon){
    const res = await fetch(`api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=6&appid=ce11a71ed128dbb658dd43707d169cc8`);
    const data = await res.json();
    console.log(data)
}
const setHour = setInterval(getHour, 1000)
document.querySelector("#input-city").value = "Camaçari";
getWeather()