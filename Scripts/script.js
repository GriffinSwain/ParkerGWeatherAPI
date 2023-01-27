import {saveToLocalStorageByName, GetFavorites, RemoveFromFavorites, CheckFavorite} from "./favorite.js";
import { key } from "./key.js";

let faveButton = document.getElementById("faveButton");
let searchButton = document.getElementById("searchButton");
let currentTemp = document.getElementById("currentTemp");
let cityName = document.getElementById("cityName");
let currentWeatherIcon = document.getElementById("currentWeatherIcon");
let currentWeatherCondition = document.getElementById("currentWeatherCondition");
let currentTime = document.getElementById("currentTime");
let currentDate = document.getElementById("currentDate");
let citySearch = document.getElementById("citySearch");
let favoritesButton = document.getElementById("favoritesButton");
let favoriteText = document.getElementById("favoriteText");
let injectHere = document.getElementById("injectHere");
let background = document.getElementById("background");
let highTempToday = document.getElementById("highTempToday");
let lowTempToday = document.getElementById("lowTempToday");
let forecastDay1 = document.getElementById("forecastDay1");
let forecastDay2 = document.getElementById("forecastDay2");
let forecastDay3 = document.getElementById("forecastDay3");
let forecastDay4 = document.getElementById("forecastDay4");
let forecastDay5 = document.getElementById("forecastDay5");
let weatherForecastIcon1 = document.getElementById("forecastWeatherIcon1");
let weatherForecastIcon2 = document.getElementById("forecastWeatherIcon2");
let weatherForecastIcon3 = document.getElementById("forecastWeatherIcon3");
let weatherForecastIcon4 = document.getElementById("forecastWeatherIcon4");
let weatherForecastIcon5 = document.getElementById("forecastWeatherIcon5");
let forecastTemp1 = document.getElementById("forecastTemp1");
let forecastTemp2 = document.getElementById("forecastTemp2");
let forecastTemp3 = document.getElementById("forecastTemp3");
let forecastTemp4 = document.getElementById("forecastTemp4");
let forecastTemp5 = document.getElementById("forecastTemp5");

let removal;
let favorited;
let cityNameUrl = "";
let cityCoordUrl = "";
let startingCityName = "";
let weather = "";
let highTemp = 0;
let lowTemp = 0;
let favoritesShown = 0;
let weatherCondition = "";
let forecastCondition1 = "";
let forecastCondition2 = "";
let forecastCondition3 = "";
let forecastCondition4 = "";
let forecastCondition5 = "";
let forecastHigh = 0;
let forecastLow = 0;
let fiveDays = 0;
let lon = 0;
let lat = 0;
let city = "";
let search = 0;
let meridian = "AM";
let twelveHour = 0;
let month = "";
let weekDay = new Date().getDay();
let dateToday = new Date().getDate();
let monthToday = new Date().getMonth();
let yearToday = new Date().getYear() + 1900;
let hoursToday = new Date().getHours();
let minutesToday = new Date().getMinutes();

favorited = CheckFavorite(city);


GetTime();

function GetTime(){

weekDay = new Date().getDay();
dateToday = new Date().getDate();
monthToday = new Date().getMonth();
yearToday = new Date().getYear() + 1900;
hoursToday = new Date().getHours();
minutesToday = new Date().getMinutes();

// if (minutesToday < 10)
// {
//     minutesToday
// }
twelveHour = hoursToday;

if (hoursToday > 12)
{
    hoursToday = (hoursToday % 12);
    meridian = "PM";
}

switch (monthToday){
    case 0: month = "January";
    break;
    case 1: month = "February";
    break;
    case 2: month = "March";
    break;
    case 3: month = "April";
    break;
    case 4: month = "May";
    break;
    case 5: month = "June";
    break;
    case 6: month = "July";
    break;
    case 7: month = "August";
    break;
    case 8: month = "September";
    break;
    case 9: month = "October";
    break;
    case 10: month = "November";
    break;
    case 11: month = "December";
    break;
}

switch(weekDay){
    case 0:
        forecastDay1.innerText = "Monday";
        forecastDay2.innerText = "Tuesday";
        forecastDay3.innerText = "Wednesday";
        forecastDay4.innerText = "Thursday";
        forecastDay5.innerText = "Friday";
    break;
    case 1:
        forecastDay1.innerText = "Tuesday";
        forecastDay2.innerText = "Wednesday";
        forecastDay3.innerText = "Thursday";
        forecastDay4.innerText = "Friday";
        forecastDay5.innerText = "Saturday";
    break;
    case 2:
        forecastDay1.innerText = "Wednesday";
        forecastDay2.innerText = "Thursday";
        forecastDay3.innerText = "Friday";
        forecastDay4.innerText = "Saturday";
        forecastDay5.innerText = "Sunday";
    break;
    case 3:
        forecastDay1.innerText = "Thursday";
        forecastDay2.innerText = "Friday";
        forecastDay3.innerText = "Saturday";
        forecastDay4.innerText = "Sunday";
        forecastDay5.innerText = "Monday";
    break;
    case 4:
        forecastDay1.innerText = "Friday";
        forecastDay2.innerText = "Saturday";
        forecastDay3.innerText = "Sunday";
        forecastDay4.innerText = "Monday";
        forecastDay5.innerText = "Tuesday";
    break;
    case 5:
        forecastDay1.innerText = "Saturday";
        forecastDay2.innerText = "Sunday";
        forecastDay3.innerText = "Monday";
        forecastDay4.innerText = "Tuesday";
        forecastDay5.innerText = "Wednesday";
    break;
    case 6:
        forecastDay1.innerText = "Sunday";
        forecastDay2.innerText = "Monday";
        forecastDay3.innerText = "Tuesday";
        forecastDay4.innerText = "Wednesday";
        forecastDay5.innerText = "Thursday";
    break;

}

if (minutesToday < 10){
    currentTime.innerText = hoursToday + ":0" + minutesToday + " " + meridian;
}else{
    currentTime.innerText = hoursToday + ":" + minutesToday + " " + meridian;
}
currentDate.innerText = month + " " + dateToday + ", " + yearToday;

}

async function success(position)
{
    // currentTime.textContent = getDate();
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    
    search = -1;
    cityCoordUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + key;
    await urlCall(cityCoordUrl);

    StartingForecast();
}

function error(err)
{
    console.warn(err.message);
}

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

//Navigator

navigator.geolocation.getCurrentPosition(success, error, options);



citySearch.addEventListener("keypress", function(e){
    if (e.key == "Enter"){
        city = citySearch.value;
        CityNameAPI(city);  
        UpdateButton(favorited);
        favorited = CheckFavorite(startingCityName);
    }
})

searchButton.addEventListener("click",function(){
    city = citySearch.value;
    CityNameAPI(city);
    UpdateButton(favorited);
    favorited = CheckFavorite(startingCityName);
    UpdateButton(favorited);
})

faveButton.addEventListener("click", function(){
    AddFavorite();
    UpdateButton(favorited);
})

favoritesButton.addEventListener("click", function(){
    ShowFavorites();
})

async function CityNameAPI(city){
    search = 0;
    cityNameUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + key;
    console.log(cityNameUrl);
    await urlCall(cityNameUrl);
    UpdateButton(favorited);
    favorited = CheckFavorite(startingCityName);
    UpdateButton(favorited);
}

async function StartingForecast()
{
    search = -2;
    cityCoordUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + key;
    console.log(cityCoordUrl);
    await urlCall(cityCoordUrl);
    UpdateButton(favorited);
    favorited = CheckFavorite(startingCityName);
    UpdateButton(favorited);
}


async function CityCoordAPI(lat, lon){
    search = 1;
    cityCoordUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + key;
    fiveDays = 0;
    await urlCall(cityCoordUrl);
    UpdateButton(favorited);
    favorited = CheckFavorite(startingCityName);
    UpdateButton(favorited);
}

async function urlCall(url) {
    await fetch(url).then(
        response => response.json()
    ).then(
        data => {
            weather = data;
            
            console.log(weather);


            if (search == -2){
                highTemp = (weather.main.temp_max);
                lowTemp = weather.main.temp_min;
                highTempToday.innerHTML = Math.floor(weather.main.temp_max) + "°";
                lowTempToday.innerHTML = Math.floor(weather.main.temp_min) + "°";
            }
            
            if (search == -1){
                
                weatherCondition = city.name;
                currentTemp.innerHTML = Math.floor(weather.list[0].main.temp) + "°";
                currentWeatherCondition.innerHTML = weather.list[0].weather[0].main;
                weatherCondition = weather.list[0].weather[0].main;
                
                cityName.innerHTML = weather.city.name;
                startingCityName = weather.city.name;

                search = 1;
                // lat = weather.coord.lat;
                // lon = weather.coord.lon;
            }

            if (search == 0){

                weatherCondition = weather.weather[0].main;
                currentWeatherCondition.innerHTML = weather.weather[0].main;
                cityName.innerHTML = weather.name;
                currentTemp.innerHTML = Math.floor(weather.main.temp) + "°";
                highTempToday.innerHTML = Math.floor(weather.main.temp_max) + "°";
                lowTempToday.innerHTML = Math.floor(weather.main.temp_min) + "°";
                lat = weather.coord.lat;
                lon = weather.coord.lon;
                startingCityName = weather.name; 
            }

            if (search == 1){

            while(fiveDays != 5)
            {
                forecastLow = 100;
                forecastHigh = 0;

            
                    // This for loop runs for 5 runs of the while loop
                    // It checks every 8 arrays that make up each day and records the highest and lowest temps

                    for(let i = (((fiveDays)*8)); i <= ((fiveDays+1)*8)-1; i++){
                        
                        if (forecastHigh < Math.floor(weather.list[i].main.temp_max))
                        {
                            forecastHigh = Math.floor(weather.list[i].main.temp_min);
                        }
                        if (forecastLow > Math.floor(weather.list[i].main.temp_min))
                        {
                            forecastLow = Math.floor(weather.list[i].main.temp_min);
                        }
                    }

                switch(fiveDays){
                    case 0: forecastTemp1.innerText = "H:" + forecastHigh + "° L:" +forecastLow + "°";
                    break;
                    case 1: forecastTemp2.innerText = "H:" + forecastHigh + "° L:" +forecastLow + "°";
                    break;
                    case 2: forecastTemp3.innerText = "H:" + forecastHigh + "° L:" +forecastLow + "°";
                    break;
                    case 3: forecastTemp4.innerText = "H:" + forecastHigh + "° L:" +forecastLow + "°";
                    break;
                    case 4: forecastTemp5.innerText = "H:" + forecastHigh + "° L:" +forecastLow + "°";
                    break;
                }
                fiveDays++;
            }
                ForecastIconSelector();
            }
                
            
            switch(weatherCondition){
            case "Clouds":
                currentWeatherIcon.src = "./Assets/cloudIcon.png";
                background.className = "container-fluid cloudBackground";
            break;
            case "Clear":
                background.className = "container-fluid clearNightBackground";
                currentWeatherIcon.src = "./Assets/clearMoonIcon.png";
                console.log(twelveHour);
                if ((twelveHour >= 7))
                {
                    currentWeatherIcon.src = "./Assets/sunIcon.png";
                    background.className = "container-fluid clearEarlyBackground";
                }
                if (twelveHour >= 13)
                {
                    currentWeatherIcon.src = "./Assets/sunIcon.png";
                    background.className = "container-fluid clearLateBackground";
                }
                if (twelveHour >= 18)
                {
                    background.className = "container-fluid clearNightBackground";
                    currentWeatherIcon.src = "./Assets/clearMoonIcon.png";
                }
            break;
            case "Snow":
                currentWeatherIcon.src = "./Assets/snowCloudIcon.png";
                background.className = "container-fluid snowBackground";
            break;
            case "Rain":
                currentWeatherIcon.src = "./Assets/rainCloudIcon.png";
                background.className = "container-fluid rainBackground";
            break;
            case "Haze":
                currentWeatherIcon.src = "./Assets/fogIcon.png";
                background.className = "container-fluid cloudBackground";
            break;
            default:
                currentWeatherIcon.src = "./Assets/cloudIcon.png";
                background.className = "container-fluid cloudBackground";
            break;
            }

            if (search == 0){
                CityCoordAPI(lat, lon);
            }

        }
    )
}

function ForecastIconSelector(){
    fiveDays = 1;
    while(fiveDays != 6)
    {

        var forecastIcon = {forecastCondition1, forecastCondition2, forecastCondition3, forecastCondition4, forecastCondition5};

        forecastIcon[fiveDays - 1] = weather.list[8*fiveDays/2].weather[0].main;

        ForecastIcons(forecastIcon[fiveDays - 1], fiveDays)

        fiveDays++;
    }

}

function ForecastIcons(forecastCondition, fiveDays){

    //var iconArray = {weatherForecastIcon1, weatherForecastIcon2, weatherForecastIcon3, weatherForecastIcon4, weatherForecastIcon5};

    if (fiveDays == 1){

    switch(forecastCondition){
        case "Clouds": weatherForecastIcon1.src = "./Assets/cloudIcon.png";
        break;
        case "Clear": weatherForecastIcon1.src = "./Assets/sunIcon.png";
        break;
        case "Snow": weatherForecastIcon1.src = "./Assets/snowCloudIcon.png";
        break;
        case "Rain": weatherForecastIcon1.src = "./Assets/rainCloudIcon.png";
        break;
        case "Haze": weatherForecastIcon1.src = "./Assets/fogIcon.png";
        break;
        default: weatherForecastIcon1.src = "./Assets/cloudIcon.png";
        break;
        }
    }

    if (fiveDays == 2){

    switch(forecastCondition){
        case "Clouds": weatherForecastIcon2.src = "./Assets/cloudIcon.png";
        break;
        case "Clear": weatherForecastIcon2.src = "./Assets/sunIcon.png";
        break;
        case "Snow": weatherForecastIcon2.src = "./Assets/snowCloudIcon.png";
        break;
        case "Rain": weatherForecastIcon2.src = "./Assets/rainCloudIcon.png";
        break;
        case "Haze": weatherForecastIcon2.src = "./Assets/fogIcon.png";
        break;
        default: weatherForecastIcon2.src = "./Assets/cloudIcon.png";
        break;
        }
    }

    if (fiveDays == 3){

    switch(forecastCondition){
        case "Clouds": weatherForecastIcon3.src = "./Assets/cloudIcon.png";
        break;
        case "Clear": weatherForecastIcon3.src = "./Assets/sunIcon.png";
        break;
        case "Snow": weatherForecastIcon3.src = "./Assets/snowCloudIcon.png";
        break;
        case "Rain": weatherForecastIcon3.src = "./Assets/rainCloudIcon.png";
        break;
        case "Haze": weatherForecastIcon3.src = "./Assets/fogIcon.png";
        break;
        default: weatherForecastIcon3.src = "./Assets/cloudIcon.png";
        break;
        }
    }

    if (fiveDays == 4){

    switch(forecastCondition){
        case "Clouds": weatherForecastIcon4.src = "./Assets/cloudIcon.png";
        break;
        case "Clear": weatherForecastIcon4.src = "./Assets/sunIcon.png";
        break;
        case "Snow": weatherForecastIcon4.src = "./Assets/snowCloudIcon.png";
        break;
        case "Rain": weatherForecastIcon4.src = "./Assets/rainCloudIcon.png";
        break;
        case "Haze": weatherForecastIcon4.src = "./Assets/fogIcon.png";
        break;
        default: weatherForecastIcon4.src = "./Assets/cloudIcon.png";
        break;
        }
    }

    if (fiveDays == 5){

    switch(forecastCondition){
        case "Clouds": weatherForecastIcon5.src = "./Assets/cloudIcon.png";
        break;
        case "Clear": weatherForecastIcon5.src = "./Assets/sunIcon.png";
        break;
        case "Snow": weatherForecastIcon5.src = "./Assets/snowCloudIcon.png";
        break;
        case "Rain": weatherForecastIcon5.src = "./Assets/rainCloudIcon.png";
        break;
        case "Haze": weatherForecastIcon5.src = "./Assets/fogIcon.png";
        break;
        default: weatherForecastIcon5.src = "./Assets/cloudIcon.png";
        break;
        }
    }

}

function UpdateButton(){
    console.log("UpdateButton Function")
    if (!favorited){
        favoriteText.innerHTML = "Remove City from Favorites"
        console.log("Remove Button")
    }
    if (favorited)
    {
        favoriteText.innerHTML = "Add City to Favorites"
        console.log("Add Button")
    }
}

function AddFavorite(){
    console.log(startingCityName);
    removal = saveToLocalStorageByName(startingCityName);
    favorited = removal;
    console.log(removal);
}

function ShowFavorites(){
    let favorites = GetFavorites();
    console.log(favoritesShown);
    // if (favoritesShown <= 1){

    //     injectHere.removeChild(h5);
    //     injectHere.removeChild(selectBtn);
    // }

        favorites.map(favorite => {
            let h5 = document.createElement('h3');
            h5.textContent = favorite;
            h5.className = "favoritesList";

        let selectBtn = document.createElement('button');
        selectBtn.className = 'btn btn-outline-danger selectBtn';
        selectBtn.type = 'button';
        selectBtn.addEventListener('click', function(){
            city = favorite;
            CityNameAPI(city);
            UpdateButton(favorited);
            favorited = CheckFavorite(startingCityName);
            UpdateButton(favorited);
        })

        injectHere.appendChild(h5);
        injectHere.appendChild(selectBtn);
    })
    favoritesShown++;
}

