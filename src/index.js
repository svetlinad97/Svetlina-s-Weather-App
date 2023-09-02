let currentDate = new Date();

function formatDate(date) {
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
  let time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  let formattedDay = `${day}, ${time}`;
  return formattedDay;
}

let displayDate = document.querySelector("#current-time");
displayDate.innerHTML = `<strong>${formatDate(currentDate)}</strong>`;

// Week 5

function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#description-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let temperature = Math.round(response.data.main.temp);
  let displayedTemperature = document.querySelector("#current-temperature");
  displayedTemperature.innerHTML = `${temperature}`;
}

function search(city) {
  let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function changeHeading(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", changeHeading);

search("Sheffield");

// Current Location

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKeyCurrent = "7ed26a6948c661d05fafe7355b41b2ec";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyCurrent}&units=metric`;
  axios.get(apiUrlCurrent).then(showTemperature);
}

function getCurrentLocation() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);
