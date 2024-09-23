class DataService {
  #baseUrl = 'https://api.openweathermap.org/data/2.5/';
  #appId = 'ca9d28dd0bb51d5f45ec10b5988b0cbf';
  #unit = 'metric';

    // return data of current forecast
  async getWeatherForecast(cityId) {
    
    const url = `${this.#baseUrl}weather?id=${cityId}&appid=${this.#appId}&units=${this.#unit}&lang=en`;
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    } else {
      console.warn(`[Error] Something wrong getting weather for city with id ${cityId}`)
      return null;
    }
  }

  //return Forecast data for next days 
  async getWeatherForecastNextDays(cityId) {
    
    const url = `${this.#baseUrl}forecast?id=${cityId}&appid=${this.#appId}&units=${this.#unit}&lang=en`;
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    } else {
      console.warn(`[Error] Something wrong getting weather for city with id ${cityId}`)
      return null;
    }
  }

  unitCelsius() {
    this.#unit = "metric";
    }
  unitFahrenheit() {
    this.#unit = "imperial";
    }
}

export const dataService = new DataService(); 