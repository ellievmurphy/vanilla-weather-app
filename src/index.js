function displayTemp(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#cityHeader");
  let tempElement = document.querySelector("#tempHeader");
  let descElement = document.querySelector("#weatherDesc");
  let humidElement = document.querySelector("#humidHeader");
  let windElement = document.querySelector("#windHeader");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descElement.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "58998f2f1d96bf70dbdd7f7a20868eb4";
let cityName = "New York";
let apiUrl = `https:api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemp);
