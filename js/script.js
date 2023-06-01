
const apiKey = "a11b08fd318501a2aba41b425973bac3"; /* verificar como fazer isso para enviar git*/
const apiCountryUrl = "https://flagsapi.com/:country_code/:style/:size.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

// funções

const getWeatherData = async(city) => {
   
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units-metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherUrl)
    const data = await res.json()

   return data

}

const showWeatherData = async (city) =>{
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp).toString().substring(0, 2);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryElement.setAttribute(
        "src", `https://flagsapi.com/${data.sys.country}/flat/64.png`)
    humidityElement.innerText = data.main.humidity + "%"
    windElement.innerText = parseInt(data.wind.speed)+ "km/h"

    weatherContainer.classList.remove("hide")
}



//eventos

searchBtn.addEventListener("click",(e)=> {
    e.preventDefault();
        const city = cityInput.value;


    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city)
    }
})