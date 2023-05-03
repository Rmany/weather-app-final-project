function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[time.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let time = new Date(timestamp);

  let date = time.getDate();

  let year = time.getFullYear();
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
  let month = months[time.getMonth()];
  return `${date} ${month} ${year}`;
}

function updateData(input) {
  let temperature = document.querySelector("#mainTemp");
  celsiusTemp = input.data.temperature.current;
  temperature.innerHTML = Math.round(celsiusTemp);
  let location = document.querySelector("#location");
  location.innerHTML = input.data.city;
  let realFeel = document.querySelector("#realFeel");
  celsiusRealFeel = input.data.temperature.feels_like;
  realFeel.innerHTML = `${Math.round(celsiusRealFeel)}°C`;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(input.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = input.data.temperature.humidity;
  let description = document.querySelector("#description");
  description.innerHTML = input.data.condition.description;
  let time = document.querySelector("#time");
  time.innerHTML = formatTime(input.data.time * 1000);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(input.data.time * 1000);
  let icon = document.querySelector("#weatherIcon");

  icon.setAttribute("src", input.data.condition.icon_url);
}

function showLocationWeather(event) {
  event.preventDefault();
  let input = document.querySelector("#locationInput");
  let city = input.value;

  let apiKey = "9ae090e1584act3b4ed90adf0ce9o7fa";
  let units = "metric";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateData);
}

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastData = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach((day) => {
    forecastData =
      forecastData +
      `<div class="col-2">
              ${day}
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
                alt=""
                width="60px"
              />
              <span class="daily-high">9°C</span
              ><span class="daily-low"> 4°C</span>
            </div>`;
  });
  forecast.innerHTML = forecastData + `</div>`;
}

function changeUnitsFahrenheit(event) {
  event.preventDefault();
  tempCelsius.classList.remove("active");
  tempFahrenheit.classList.add("active");
  let temperature = document.querySelector("#mainTemp");
  temperature.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  let realTemp = document.querySelector("#realFeel");
  let realFeelFahrenheit = Math.round((celsiusRealFeel * 9) / 5 + 32);
  realTemp.innerHTML = `${realFeelFahrenheit}°F`;
}
function changeUnitsCelsius(event) {
  event.preventDefault();
  tempCelsius.classList.add("active");
  tempFahrenheit.classList.remove("active");
  let temperature = document.querySelector("#mainTemp");
  temperature.innerHTML = Math.round(celsiusTemp);
  let realTemp = document.querySelector("#realFeel");
  let realFeelCelsius = Math.round(celsiusRealFeel);
  realTemp.innerHTML = `${realFeelCelsius}°C`;
}

let celsiusTemp = null;
let celsiusRealFeel = null;

let locationSearch = document.querySelector("form");
locationSearch.addEventListener("submit", showLocationWeather);

let tempFahrenheit = document.querySelector("#fahrenheit");
tempFahrenheit.addEventListener("click", changeUnitsFahrenheit);

let tempCelsius = document.querySelector("#celsius");
tempCelsius.addEventListener("click", changeUnitsCelsius);

displayForecast();
