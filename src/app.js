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

function findDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(input) {
  let forecast = input.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastData = `<div class="row">`;
  forecast.forEach((day, index) => {
    if (index < 6) {
      celsiusForecastHigh = day.temperature.maximum;
      celsiusForecastLow = day.temperature.minimum;
      forecastData =
        forecastData +
        `<div class="col-2">
              ${findDay(day.time)}
              <img
                src="${day.condition.icon_url}"
                alt=""
                width="60px"
              />
              <div class="daily-high">${Math.round(celsiusForecastHigh)}°C</div
              ><div class="daily-low"> ${Math.round(celsiusForecastLow)}°C</div>
            </div>`;
    }
  });
  forecastElement.innerHTML = forecastData + `</div>`;
}

function getForecast(location) {
  let city = location;
  let apiKey = "9ae090e1584act3b4ed90adf0ce9o7fa";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
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
  getForecast(input.data.city);
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

let locationSearch = document.querySelector("form");
locationSearch.addEventListener("submit", showLocationWeather);
