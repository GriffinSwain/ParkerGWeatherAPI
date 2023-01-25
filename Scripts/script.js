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

let cityNameUrl = "";
let cityCoordUrl = "";
let weather = "";
let highTemp = 0;
let lowTemp = 0;
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
let month = "";
let dateToday = new Date().getDate();
let monthToday = new Date().getMonth();
let yearToday = new Date().getYear() + 1900;
let hoursToday = new Date().getHours();
let minutesToday = new Date().getMinutes();

console.log(dateToday);
console.log(monthToday);
console.log(yearToday);
console.log(hoursToday);
console.log(minutesToday);

GetTime();

function GetTime(){

dateToday = new Date().getDate();
monthToday = new Date().getMonth();
yearToday = new Date().getYear() + 1900;
hoursToday = new Date().getHours();
minutesToday = new Date().getMinutes();

// if (minutesToday < 10)
// {
//     minutesToday
// }

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

currentTime.innerText = hoursToday + ":" + minutesToday + meridian;
currentDate.innerText = month + " " + dateToday + ", " + yearToday;

}

function success(position)
{
    search = -1;
    // currentTime.textContent = getDate();
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    cityCoordUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=365f138cea066f516791f6d7897e34d4&units=imperial";
    urlCall(cityCoordUrl);
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

            if (search == -1){

                console.log(weather.city.name);
                weatherCondition = city.name;
                currentTemp.innerHTML = Math.floor(weather.list[0].main.temp) + "°";
                console.log(weather.list[0].main.temp);
                console.log(weather.list[0].weather[0].main);
                currentWeatherCondition.innerHTML = weather.list[0].weather[0].main;
                weatherCondition = weather.list[0].weather[0].main;
                cityName.innerHTML = weather.city.name;
                // lat = weather.coord.lat;
                // lon = weather.coord.lon;
            }

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

            if (search == 1){

            while(fiveDays != 5)
            {
                forecastLow = 100;
                forecastHigh = 0;

                // This for loop only works the first time the while loop runs
                // It checks the first 8 arrays of the forecast API for the high and low temp for the first day 
                if (fiveDays == 0){
                    for(let i = 0; i <= ((fiveDays+1)*8)-1; i++){
                    
                        if (forecastHigh < Math.floor(weather.list[i].main.temp_max))
                        {
                            forecastHigh = Math.floor(weather.list[i].main.temp_min);
                        }
                        if (forecastLow > Math.floor(weather.list[i].main.temp_min))
                        {
                            forecastLow = Math.floor(weather.list[i].main.temp_min);
                        }
                    }
                    // This next for loop runs the next four runs of the while loop
                    // It checks every 8 arrays that make up each day and records the highest and lowest temps
                }else{

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
            case "Haze":
                currentWeatherIcon.src = "./Assets/fogIcon.png";
                background.className = "container-fluid cloudBackground";
            break;
            }

            if (search == 0){
                CityCoordAPI(lat, lon);
            }

        }
    )
}
