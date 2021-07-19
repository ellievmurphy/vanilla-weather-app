function displayTemp(response) {
  let cityElement = document.querySelector("#cityHeader");
  let tempElement = document.querySelector("#tempHeader");
  let descElement = document.querySelector("#weatherDesc");
  let humidElement = document.querySelector("#humidHeader");
  let windElement = document.querySelector("#windHeader");
  let iconElement = document.querySelector("#weatherIcon");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descElement.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", "response.data.weather[0].description");
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

let currTime = new Date();
let apiKey = "58998f2f1d96bf70dbdd7f7a20868eb4";
let cityName = "New York";
let apiUrl = `https:api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
let timeElement = document.querySelector("#timeHeader");
timeElement.innerHTML = formatDate(currTime);

axios.get(apiUrl).then(displayTemp);
