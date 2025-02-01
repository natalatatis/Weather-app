const weatherForm = document.getElementById("weatherForm");
const resultDiv = document.getElementById("weatherResult");

//Event listener to handle the form submission
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  //Get the input value and remove leading and trailing spaces
  const citiesInput = document.getElementById("citiesInput").value.trim();

  //Clear previous results
  resultDiv.innerHTML = "";

  //Check if input is empty
  if (!citiesInput) {
    resultDiv.innerHTML =
      '<div class="alert alert-danger">Please enter a city name!</div>';
    return;
  }

  //Split the input by commas to get each city name
  const cities = citiesInput.split(",").map((city) => city.trim());

  try {
    //API key for openWeather
    const API_KEY = "60ac65916e9069d7b3fa9cebb7119467";
    /* const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );*/

    //fetch data for multiple cities
    const weatherPromises = cities.map((city) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      ).then((response) => {
        if (!response.ok) {
          throw new Error("City not found! Try again"); //handle invalid cities
        }
        return response.json(); //convert response to JSON
      })
    );

    //wait for all fetch requests to be completed
    const weatherData = await Promise.all(weatherPromises);

    //ensure the data received is valid
    if (!weatherData || weatherData.length === 0) {
      throw new Error("No valid city data received!");
    }

    /* const name = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;*/

    //html to display
    resultDiv.innerHTML = weatherData
      .map(
        (data) =>
          `
    <div class="card result-card p-3">
        <div class="card-body text-center">
        <h5 class="card-title">${data.name}, ${data.sys.country} <i class="fas fa-map-marker-alt text-info"></i></h5>
        <p class="mb-2"><i class="fas fa-temperature-high text-danger"></i> <strong>${data.main.temp}°C</strong></p>
        <p class="mb-2"><i class="fas fa-cloud text-primary"></i> ${data.weather[0].description}</p>
        <p class="mb-0"><i class="fas fa-tint text-info"></i> Humidity: ${data.main.humidity}%</p>
        </div>
    </div>
    `
      )
      .join("");
  } catch (error) {
    resultDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
  }
});
