const weatherForm = document.getElementById("weatherForm");
const resultDiv = document.getElementById("weatherResult");

//Event listener to handle the form submission
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // const cityInput = citiesInput.split(",").map((city) => city.trim());
  const city = document.getElementById("citiesInput").value.trim();
  resultDiv.innerHTML = "";

  if (!city) {
    resultDiv.innerHTML =
      '<div class="alert alert-danger">Please enter a city name!</div>';
    return;
  }

  try {
    //API key
    const API_KEY = "60ac65916e9069d7b3fa9cebb7119467";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("City not found!");
    }

    const data = await response.json();

    const name = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;

    //html to display (needs corrections)
    resultDiv.innerHTML = `
    <div class="card result-card p-3">
        <div class="card-body text-center">
        <h5 class="card-title">${name}, ${data.sys.country} <i class="fas fa-map-marker-alt text-info"></i></h5>
        <p class="mb-2"><i class="fas fa-temperature-high text-danger"></i> <strong>${temperature}°C</strong></p>
        <p class="mb-2"><i class="fas fa-cloud text-primary"></i> ${description}</p>
        <p class="mb-0"><i class="fas fa-tint text-info"></i> Humidity: ${humidity}%</p>
        </div>
    </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
  }
});
