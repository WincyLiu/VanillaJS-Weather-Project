//Date
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
