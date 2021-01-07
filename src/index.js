// day and time
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

let date = document.querySelector("#date");

date.innerHTML = `<strong> ${day} </strong> <br /> ${month}, ${dates} <br />Partly cloudy <br />`;

// for updated 
function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Updated at: ${hours}:${minutes}`;
}
let timeUpdate = document.querySelector("#updated")
timeUpdate .innerHTML = formatDate();

// search city and show temperature
function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#today-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Warsaw");

//Get geolocation
function showRealTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = document.querySelector("#city-name");
  let temperatureHTML = document.querySelector("#today-temperature");
  let cityName = response.data.name;
  city.innerHTML = `${cityName}`;
  temperatureHTML.innerHTML = `${temperature} º`;
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

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentPosition);

// temperature conversion
function convertToFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = `46.4 ºF`;

  let temperatureElement2 = document.querySelector("#today-temperature2");
  temperatureElement2.innerHTML = `51º/39º`;
}

function convertToCelcius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = `8 ºC`;

  let temperatureElement2 = document.querySelector("#today-temperature2");
  temperatureElement2.innerHTML = `11º/4º`;
}

let fahrenheitLink = document.querySelector("#gradesFarenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#gradesCelsius");
celciusLink.addEventListener("click", convertToCelcius);
