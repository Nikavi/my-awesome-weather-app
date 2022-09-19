// Let current day
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
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
  let month = months[date.getMonth()];
  let dateCr = date.getDate();
  // calculate the date
  return `${day}, ${dateCr} ${month} ${hours}:${minutes}`;
}


//let presentData = document.querySelector("#date");
//presentData.innerHTML = `${day}, ${date} ${month} ${time}:${minutes}`;

// Let convert between °C/°F
function showCelcius(event) {
  event.preventDefault();
  convertCelsius.classList.add("active");
   convertFahrenheit.classList.remove("active");
  let tempEl = document.querySelector("#current-temperature");
  tempEl.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();
  let tempEl = document.querySelector("#current-temperature");
  // remove the active class the celsius link
  convertCelsius.classList.remove("active");
  convertFahrenheit.classList.add("active");
  let fahrenheiTemp = (celsiusTemperature * 9) / 5 + 32;
  tempEl.innerHTML = Math.round(fahrenheiTemp);
}
let celsiusTemperature = null;
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
    celsiusTemperature = response.data.main.temp;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
