import { getElem } from "./helpers.js"

export class ForecastListView {
  #forecastTableBody
  constructor(tableBodyId) {
    this.#forecastTableBody = getElem(tableBodyId)
  }

  showForecast(item) {
    this.#forecastTableBody.append(item.createElement());
  }

  clearForecast() {
    this.#forecastTableBody.innerHTML = "";
  }

  //delete row with current city's data, excl. the city 
  // clearSelectedForecast() {  
  //   this.#forecastTableBody.
  // }

  showForecastFewDays(item) {
    this.#forecastTableBody.append(item.createElementFewDays());
  }
}