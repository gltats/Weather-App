// day and time
function formatDate(timestamp){
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentTime.getDay()];

let dates = currentTime.getDate();

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[currentTime.getMonth()];
return `<strong> ${day} </strong> <br /> ${month}, ${dates}`;
}


// for updated 
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


// search city and show temperatures
function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#today-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#updated").innerHTML = `Updated at ${formatHours(response.data.dt * 1000)}`;

  let iconElement = document.querySelector("#icon-today")
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  
  celsiusTemperature = response.data.main.temp; 

}

//Forecast Hourly
function displayWeatherForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML += `
        <div class="col-1.75" id="columnsForecast">
          <div class="card1">
            <div class="card-body">
              <h5 class="card-title">${formatHours(forecast.dt * 1000)}
              </h5>
              <p class="forecastP">
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="iconWeather"/>
                  <br />
                    ${Math.round(forecast.main.temp_max)}º /  ${Math.round(forecast.main.temp_min)}º <br />
                    ${forecast.main.humidity}% 💧 <br />
              </p>
            </div>
          </div>
        </div>
      `;
  }
}


function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

//Get geolocation
function showRealTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = document.querySelector("#city-name");
  let temperatureHTML = document.querySelector("#today-temperature");
  let cityName = response.data.name;
  city.innerHTML = `${cityName}`;
  temperatureHTML.innerHTML = `${temperature}`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "65bd5d27fb5bb2b47af1afd93925a308";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showRealTemperature);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}



// temperature conversion
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//change video Day/ Night
var n = new Date().getHours();

let video = document.querySelector("#video");
let videoSrc = document.querySelector("#videoSrc");
let bodyColor = document.querySelector("body");
if (n > 19 || n < 6) {
  videoSrc.setAttribute("src", "src/img/night.mp4");
  bodyColor.className = "night";
} else {
  videoSrc.setAttribute("src", "src/img/day.mp4");
  bodyColor.className = "day";
}
video.load();

  
let date = document.querySelector("#date");
date.innerHTML = formatDate();

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentPosition);

searchCity("Warsaw");
