if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("http").createServer((req, res) => res.send("Ahoy!"));
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

let weather = {
  apiKey: "f17b8cc4f6402c486f55e7111980a98c",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function () {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Clarksville");
// A little JQuery
$(document).ready(function () {
  $(".weather").click(function () {
    $("#1").fadeIn("slow");
    $("#2").fadeIn(5000);
  });
});
