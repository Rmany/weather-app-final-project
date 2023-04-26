function updateData(input) {
  console.log(input.data);
  let temperature = document.querySelector("#mainTemp");
  temperature.innerHTML = Math.round(input.data.temperature.current);
  let location = document.querySelector("#location");
  location.innerHTML = input.data.city;
  let realFeel = document.querySelector("#realFeel");
  realFeel.innerHTML = Math.round(input.data.temperature.feels_like);
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(input.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = input.data.temperature.humidity;
}

let apiKey = "9ae090e1584act3b4ed90adf0ce9o7fa";
let units = "metric";
let city = "cairo";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

axios.get(apiUrl).then(updateData);
