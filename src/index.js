function displayTemp(response) {
  let cityElement = document.querySelector("#cityHeader");
  let tempElement = document.querySelector("#tempHeader");
  let descElement = document.querySelector("#weatherDesc");
  let humidElement = document.querySelector("#humidHeader");
  let windElement = document.querySelector("#windHeader");
  let iconElement = document.querySelector("#weatherIcon");

  celsiusTemp = Math.round(response.data.main.temp);

  tempElement.innerHTML = celsiusTemp;
  cityElement.innerHTML = response.data.name;
  descElement.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", "response.data.weather[0].description");

  getForecast(response.data.coord);
}
function formatDate(currTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currTime.getDay()];
  let hour = currTime.getHours();
  let minutes = currTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day} ${hour}:${minutes}`;
}
function search(city) {
  let apiKey = "58998f2f1d96bf70dbdd7f7a20868eb4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  convertCel.classList.remove("active");
  convertFah.classList.add("active");
  convertFah.classList.remove("inactive");
  convertCel.classList.add("inactive");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let tempElement = document.querySelector("#tempHeader");
  tempElement.innerHTML = fahrenheitTemp;
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  convertFah.classList.remove("active");
  convertCel.classList.remove("inactive");
  convertCel.classList.add("active");
  convertFah.classList.add("inactive");

  let tempElement = document.querySelector("#tempHeader");
  tempElement.innerHTML = celsiusTemp;
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="https://ssl.gstatic.com/onebox/weather/48/sunny_s_cloudy.png"
          alt=""
          width="36"
        />
        <div class="weather-forecast-temp">
          <span class="weather-forecast-max">18</span>
          <span class="weather-forecast-min">12</span>
        </div>
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "58998f2f1d96bf70dbdd7f7a20868eb4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

let currTime = new Date();
let timeElement = document.querySelector("#timeHeader");
timeElement.innerHTML = formatDate(currTime);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemp = null;
let convertCel = document.querySelector("#celsius-link");
let convertFah = document.querySelector("#fahrenheit-link");
convertFah.addEventListener("click", displayFahrenheitTemp);
convertCel.addEventListener("click", displayCelsiusTemp);

search("New York");
displayForecast();
