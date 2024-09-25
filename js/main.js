import { ForecastListView } from './forecastListView.js';
import { dataService } from './dataService.js'
import { STATE } from './state.js';
import { Forecast } from './forecast.js';


window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  const forecastListView = new ForecastListView('#tableBody');

  updateForecast(forecastListView);
  
  const typeTemperature = document.querySelector("#type-temperature");

  typeTemperature.addEventListener('click', changeTypeTemp);
    
    function changeTypeTemp(event) {
      if(event.target.id === "celsius") {
        dataService.unitCelsius();
        forecastListView.clearForecast();
        updateForecast(forecastListView);

      } else {
        dataService.unitFahrenheit();  
        forecastListView.clearForecast();
        updateForecast(forecastListView);
      }
    }
})
      let check = false;
    function updateForecast(forecastListView) {
      const promises = STATE.cities.map(cityID => dataService.getWeatherForecast(cityID));
      Promise.allSettled(promises).then((results) => {
        
          console.log(results);
          results.forEach((result) => 
          {
              const currentForecast = new Forecast(result.value, result.value.id);
              forecastListView.showForecast(currentForecast);
              
          }
        );
      });

    const forecastTableBody = document.querySelector("#tableBody");
    if (!check) {
      check = true;
    forecastTableBody.addEventListener('click', (event) => {
    (async function (e) {
      let tr = e.target.parentNode; //tag tr
      forecastListView.clearSelectedForecast(tr); //clear forecast of clicked row 
      const cityId = e.target.id;
      const dataForecast = await dataService.getWeatherForecastNextDays(cityId); 
      for(let i = 0; i < 5; i++) {
        // const dataCounterDays = dataForecast.list[i];
        const forecastActually = Forecast.minMaxTemp(dataForecast.list);
        const forecastNextDays = new Forecast(forecastActually[i], cityId);
        
        forecastListView.showForecastFewDays(tr, forecastNextDays);
      }
    })(event);
  })
    }
}


