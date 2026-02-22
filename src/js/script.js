const API = "6cdacee3d0a45ea89150b4300e6d5f4d"
const btn = document.querySelector(".btn")
const input = document.querySelector(".search-box")
const div = document.createElement('div')
const container = document.querySelector(".search-container")
let img = ""

btn.addEventListener('click', async () => {
    const text = input.value
    let coord = await getCity(text)
    getData(coord)
})

async function getCity(text){
    try{
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${text}&appid=${API}`)
        const data = await response.json()
        const lat = data[0].lat 
        const lon = data[0].lon  
        return [lat, lon]
    }   
    catch(e){
        console.error(e)
    }
}

async function getData(coord){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&appid=${API}&units=imperial`) 
        const data = await response.json()
        console.log(data)
        if(data.weather[0].description == "clear sky"){
            img = "./assets/sunny.png"
        }
        else if(data.weather[0].description == "overcast clouds"){
            img = "./assets/cloudy.png"
        }
        else{
            img = ""
        }
        div.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <img src=${img}>
            <p>${data.main.temp}°F</p>
            <p>Feels Like: ${data.main.feels_like}°F</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `
        container.appendChild(div)
        div.classList.add('weather-card')
    }
    catch(e){
        console.error(e)
    }
}

