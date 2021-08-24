//Current Date
function formatDate() {
  let now = new Date();
  let date = now.getDate();

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day} ${month} ${date}, ${hour}:${minute}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//Forecast
function formatDay(timestamp) {
  let futureDate = new Date(timestamp * 1000);
  let day = futureDate.getDay();
  let futureDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return futureDays[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row"> `;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-sm">
    <div class="forecast-date">${day}</div>
    <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42" />
    <div class="forecast-temperatures">
      <span class="forecast-temperature-max"> 18° </span>
      <span class="forecast-temperature-min"> 12° </span>
    </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "f3a6803962b9a95d77dfdbc8dc0f3991";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


//Search
function searchCity(city) {
  let apiKey = "f3a6803962b9a95d77dfdbc8dc0f3991";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}
searchCity("London");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitCity);

function showTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  
   let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].main);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;

  let currentHumidity = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = document.querySelector("#wind");
  let speed = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind Speed: ${speed} m/s`;

  let cloud = document.querySelector("#cloudiness");
  let cloudy = response.data.clouds.all;
  cloud.innerHTML = `Cloudiness: ${cloudy}%`;
  
   getForecast(response.data.coord);
}

//Geolocation
function currentLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  let apiKey = "f3a6803962b9a95d77dfdbc8dc0f3991";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let geolocationButton = document.querySelector("#geolocation");
geolocationButton.addEventListener("click", findLocation);

//Units
function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeToCelsius);
