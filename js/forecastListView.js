import { getElem } from "./helpers.js"

export class ForecastListView {
  #forecastTableBody
  constructor(tableBodyId) {
    this.#forecastTableBody = getElem(tableBodyId);
  }

  showForecast(item) {
    this.#forecastTableBody.append(item.createElement());
  }

  clearForecast() {
    this.#forecastTableBody.innerHTML = "";
  }

  //delete row with current city's data, excl. the city 
  clearSelectedForecast(tr) {  
      const trLength = tr.cells.length;
      for(let i = 1; i < trLength; i++) {
        tr.cells[1].remove();
      }
  }

  // method to show created tags with data, need to pass parameters (table row, forecast - Forecast object)
      showForecastFewDays(tableRow, forecast) {
      forecast.createElementFewDays(tableRow); // in object Forecast is called the method for td creation
      }
}