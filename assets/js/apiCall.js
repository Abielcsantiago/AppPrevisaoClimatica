async function weathearApi(lat, lon){
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ce11a71ed128dbb658dd43707d169cc8`) 
    const data = await res.json();
    return data
    // https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}
}
async function geoApi(cidade){
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=ce11a71ed128dbb658dd43707d169cc8`)
    const objRes = await res.json();
    const lat = objRes[0].lat;
    const lon = objRes[0].lon;
    const info = await weathearApi(lat, lon)
    const clima = info.main
    console.log(`Informações climáticas de ${cidade}:`)
    console.log(`Temperatura ${clima.temp}`)
    console.log(`Sensação termica ${clima.feels_like}`)
    console.log(`Temperatura máxima ${clima.temp_max}`)
    console.log(`Temperatura mínima ${clima.temp_min}`)
    console.log(`Umidade ${clima.humidity}`)
    console.log(info)
}
geoApi("Santo amaro");