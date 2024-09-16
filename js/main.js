import { ForecastListView } from './forecastListView.js';
import { dataService } from './dataService.js'
import { STATE } from './state.js';
import { Forecast } from './forecast.js';


window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  const forecastListView = new ForecastListView('#tableBody');

  // const promises = STATE.cities.map(cityID => dataService.getWeatherForecast(cityID));
  // Promise.allSettled(promises);

  updateForecast(forecastListView);

  const typeTemperature = document.querySelector("#type-temperature");
  typeTemperature.addEventListener('click', (event) => {
    console.log(event.target);
    if(event.target.id === "celsius") {
      dataService.unitCelsius();
    } else {
      dataService.unitFahrenheit();
    }
    forecastListView.clearForecast();
    updateForecast(forecastListView);
  })
})

function updateForecast(forecastListView) {
  STATE.cities.forEach(async (cityId) => {
    const forecast = await dataService.getWeatherForecast(cityId);
    // console.log(forecast);
    const currentForecast = new Forecast(forecast);
    // console.log(currentForecast);
    forecastListView.showForecast(currentForecast);
  });
}
