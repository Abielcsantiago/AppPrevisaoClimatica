export {setCurrentWeather, setWeatherForecast}; 
const clock = document.querySelector("#clock");
function getHour(){
    const today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    if(hours < 10) hours = "0" + hours;
    if(minutes < 10) minutes = "0" + minutes;
    clock.innerText = `${hours}:${minutes}`;
}
function setWallpaperAndIcon(code, iconElement){
    let wallpaper = "";
    let icon = "";
    const hour = new Date().getHours();
    const clear = [0,1];
    const cloudy = [2,3,45,48];
    const lightRain = [51,53,56,61,63,66,80,81];
    const heavyRain = [55,57,65,67,82,95,96,99];
    const snow = [71,73,75,77,85,86];
    if(hour < 18 && hour >= 5 ){
        if(clear.includes(code)){
            wallpaper = "sunWallpaper.jpg"; 
            icon = "iconClear.png";
        }else if(cloudy.includes(code)){
            wallpaper = "lightCloudWallpaper.jpg";
            icon = "iconCloud.png";      
        }else if(lightRain.includes(code)){
            wallpaper = "rainWallpaper.jpg";
            icon = "iconRain.png"; 
        }else if(heavyRain.includes(code)){
            wallpaper = "cloudyWallpaper.jpg";
            icon = "iconStorm.png";     
        }else{
            wallpaper = "snowWallpaper.jpg"; 
            icon = "iconSnow.png";    
        }    
    }else{
        if(clear.includes(code)){
            wallpaper = "clearNightWallpaper.jpg"; 
            icon = "moonIcon.png";
        }else if(cloudy.includes(code)){
            wallpaper = "clearNightWallpaper.jpg";
            icon = "moonCloudIcon.png";      
        }else if(lightRain.includes(code)){
            wallpaper = "rainNightWallpaper.jpg";
            icon = "moonRainIcon.png"; 
        }else if(heavyRain.includes(code)){
            wallpaper = "rainNightWallpaper.jpg";
            icon = "moonStormIcon.png";     
        }else{
            wallpaper = "clearNightWallpaper.jpg"; 
            icon = "moonIcon.png";    
        } 
    }
    iconElement.setAttribute("src", `./assets/img/${icon}`);
    document.body.style.backgroundImage = `url("./assets/img/${wallpaper}")`;
}
function setCurrentWeather(temp, feelsLike, humidity, windSpeed, code, city){
    const windElement = document.querySelector("#wind-value");
    const feelsLikeElement = document.querySelector("#feels-like-value");
    const humidityElement = document.querySelector("#humidity-value");
    const tempElement = document.querySelector("#temp-today");
    const cityElement = document.querySelector("#city-name");
    const iconElement = document.querySelector("#icon-temp-today");
    windElement.innerText = windSpeed;
    feelsLikeElement.innerText = feelsLike;
    humidityElement.innerText = humidity;
    tempElement.innerText = temp;
    cityElement.innerText = city;
    setWallpaperAndIcon(code, iconElement);
}
function setWeatherForecast(max, min, mean, date, code){
    const listForecast = document.querySelectorAll(".forecast-day");
    listForecast.forEach(setForecastContent)
    function setForecastContent(listItem, i, array){
        const dayWeak = listItem.querySelector(".day-weak");
        const iconElement = listItem.querySelector(".icon");
        const maxValue = listItem.querySelector(".max");
        const minValue = listItem.querySelector(".min"); 
        const progress = listItem.querySelector(".progress"); 
        dayWeak.innerText = getDayWeak(date[i]);
        maxValue.innerText = max[i].toFixed(1) + "°";
        minValue.innerText = min[i].toFixed(1) + "°";
        if(Math.abs(max[i]) < Math.abs(min[i])){
            const percentProgress = (Math.abs(mean[i]) / Math.abs(min[i])) * 100;
            progress.style.marginLeft = `calc(${percentProgress}% - 30px)`;
        }else{
            const percentProgress = (Math.abs(mean[i]) / Math.abs(max[i])) * 100;
            progress.style.marginLeft = `calc(${percentProgress}% - 30px)`;  
        }
        progress.setAttribute("title", mean[i].toFixed(1) + "°")
        progress.style.setProperty("--contentBefore", `"${mean[i].toFixed(1)}°"` )
        setIconForecast(iconElement, code[i])
    }
}
function setIconForecast(element, code){
    let icon = "";
    const clear = [0,1];
    const cloudy = [2,3,45,48];
    const lightRain = [51,53,56,61,63,66,80,81];
    const heavyRain = [55,57,65,67,82,95,96,99];
    const snow = [71,73,75,77,85,86];
    if(clear.includes(code)){
        icon = "iconClear.png";
    }else if(cloudy.includes(code)){
        icon = "iconCloud.png";      
    }else if(lightRain.includes(code)){
        icon = "iconRain.png"; 
    }else if(heavyRain.includes(code)){
        icon = "iconStorm.png";     
    }else{
        icon = "iconSnow.png";    
    }
    element.setAttribute("src", `./assets/img/${icon}`); 
}
function getDayWeak(date){
    const fullDate = new Date(date);
    const day = fullDate.getDay();
    switch(day){
        case(0):
            return "Mon";
        case(1):
            return "Tue";
        case(2):
            return "Wed";
        case(3):
            return "Thu";
        case(4):
            return "Fri";
        case(5):
            return "Sat";
        default:
            return "Sun";
    }
}
setInterval(getHour, 1000)