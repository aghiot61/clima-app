// variáveis

const api = "2bef099449775d9e362dc3de3bbf7cf2"

const locationInput = document.getElementById('location_input')
const searchBtn = document.getElementById('btn')

const cityElement = document.querySelector('#city')
const temperatureElement = document.querySelector('#temperature span')
const descriptionElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const humidityElement = document.querySelector('#details_container #humidity span')
const windElement = document.querySelector('#details_container #wind span')

// funções

const getWeatherData = async (location) => {

    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api}&lang=pt_br`

    const res = await fetch(apiWeatherUrl)
    const data = await res.json()

    return data
}

const showWeather = async (location) => {

    const data = await getWeatherData(location)

    cityElement.innerText = data.name
    temperatureElement.innerText = parseInt(data.main.temp)
    descriptionElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`
}



// eventos

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const location = locationInput.value

    showWeather(location)
})

locationInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const location = e.target.value

        showWeather(location)
    }
})