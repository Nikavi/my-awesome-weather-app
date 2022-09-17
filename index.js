// Let current day
let now = new Date();
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
let date = now.getDate();

// Let current time
let time = now.getHours();
if (time < 10) {
  time = `0${time}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let presentData = document.querySelector("#date");
presentData.innerHTML = `${day}, ${date} ${month} ${time}:${minutes}`;

// Let convert between °C/°F
function showCelcius(event) {
  event.preventDefault();
  let tempEl = document.querySelector("#current-temperature");
  tempEl.innerHTML = 19;
}

function showFahrenheit(event) {
  event.preventDefault();
  let tempEl = document.querySelector("#current-temperature");
  tempEl.innerHTML = Math.round(19 * 1.8 + 32);
}

let convertCelsius = document.querySelector("#celsius-link");
convertCelsius.addEventListener("click", showCelcius);
let convertFahrenheit = document.querySelector("#fahrenheid-link");
convertFahrenheit.addEventListener("click", showFahrenheit);

// Let display city
//function searchCity(event) {
// event.preventDefault();
// let city = document.querySelector("#input-city").value;
//let h1 = document.querySelector("h1");
//h1.innerHTML = `${city}`;
//}
//let search_form = document.querySelector("#search-city-form");
//search_form.addEventListener("submit", searchCity);

// Search user input city
function userInputCity(city) {
  let units = "metric";
  let apiKey = "9abaed0b9d9528a5275130c1d2682623";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  //let temperature = Math.round(response.data.main.temp);
  console.log(response.data.main.temp);
  //h1.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  userInputCity(city);
}

function retrievePosition(position) {
  let apiKey = "9abaed0b9d9528a5275130c1d2682623";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", searchCity);
