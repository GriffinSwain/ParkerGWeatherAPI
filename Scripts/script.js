let faveButton = document.getElementById("faveButton");
let searchButton = document.getElementById("searchButton");
let currentTemp = document.getElementById("currentTemp");
let cityName = document.getElementById("cityName");
let currentWeatherIcon = document.getElementById("currentWeatherIcon");
let currentWeatherCondition = document.getElementById("currentWeatherCondition");
let currentTime = document.getElementById("currentTime");
let currentDate = document.getElementById("currentDate");
let citySearch = document.getElementById("citySearch");
let background = document.getElementById("background");

let cityNameUrl = "";
let cityCoordUrl = "";
let weather = "";
let weatherCondition = "";
let lon = 0;
let lat = 0;
let city = "";
let search = 0;

searchButton.addEventListener("click",function(){
    city = citySearch.value;
    CityNameAPI(city);
})

function CityNameAPI(city){
    search = 0;
    cityNameUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=365f138cea066f516791f6d7897e34d4&units=imperial";
    console.log(cityNameUrl);
    urlCall(cityNameUrl);
}

function CityCoordAPI(lat, lon){
    search = 1;
    cityCoordUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=365f138cea066f516791f6d7897e34d4&units=imperial";
    urlCall(cityCoordUrl);
}

function urlCall(url) {
    fetch(url).then(
        response => response.json()
    ).then(
        data => {
            weather = data;
            
            console.log(weather)

            if (search == 0){

                weatherCondition = weather.weather[0].main;
                currentWeatherCondition.innerHTML = weather.weather[0].main;
                cityName.innerHTML = weather.name;
                currentTemp.innerHTML = Math.floor(weather.main.temp) + "°";
                lat = weather.coord.lat;
                lon = weather.coord.lon;
                console.log(weather);
                console.log(weather.name);
                console.log(weather.coord.lon);
                console.log(weather.coord.lat);
                console.log(weather.main.temp);
                console.log(weather.weather[0].main);
                
                console.log(weatherCondition);
            }
                
            
            switch(weatherCondition){
            case "Clouds":
                currentWeatherIcon.src = "./Assets/cloudIcon.png";
                background.className = "container-fluid cloudBackground";
            break;
            case "Clear":
                currentWeatherIcon.src = "./Assets/sunIcon.png";
                background.className = "container-fluid clearBackground";
            break;
            case "Snow":
                currentWeatherIcon.src = "./Assets/snowCloudIcon.png";
                background.className = "container-fluid snowBackground";
            break;
            case "Rain":
                currentWeatherIcon.src = "./Assets/rainCloudIcon.png";
                background.className = "container-fluid rainBackground";
            break;
            }

            if (search == 0){
                CityCoordAPI(lat, lon);
            }

        }
    )
}
