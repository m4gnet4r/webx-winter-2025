const apiUrl_geo="https://geocoding-api.open-meteo.com/v1/search?name=";
const apiUrl_sub1="https://api.open-meteo.com/v1/forecast?";
const apiUrl_sub2="&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code";

const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");

const weatherIcon=document.querySelector(".weather-icon");

async function checkWeather(city){
    const response1= await fetch(apiUrl_geo+city);

/*    if(response1.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }*/

    try{
        var data_geo = await response1.json();
        var longitude=data_geo.results[0].longitude;
        var latitude=data_geo.results[0].latitude;
        const apiUrl=apiUrl_sub1+`latitude=${latitude}&longitude=${longitude}`+apiUrl_sub2;
        const response2 = await fetch(apiUrl);
        var data= await response2.json();

        console.log(data);

        document.querySelector(".city").innerHTML = city.toUpperCase() ;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temperature_2m) +"°C";
        document.querySelector(".humidity").innerHTML = data.current.relative_humidity_2m+"%";
        document.querySelector(".wind").innerHTML = data.current.wind_speed_10m+"km/h";

        if([1,2,3].includes(data.current.weather_code)){
            weatherIcon.src="assets/cloud.png";
        }
        else if([45,48].includes(data.current.weather_code)){
            weatherIcon.src="assets/mist.png";
        }
        else if([61,63,65,66,67,80,81,82].includes(data.current.weather_code)){
            weatherIcon.src="assets/rain.png";
        }
        else if([71,73,75,77].includes(data.current.weather_code)){
            weatherIcon.src="assets/snow.png";
        }
        else if([51,53,55,56,57].includes(data.current.weather_code)){
            weatherIcon.src="assets/drizzle.png";
        }
        else {
            weatherIcon.src="assets/clear.png";
        }
        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
    }
    catch(err){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keypress",function(event){
    if(event.key=="Enter"){
        checkWeather(searchBox.value);
    }
})
