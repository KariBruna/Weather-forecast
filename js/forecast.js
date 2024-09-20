export class Forecast {
  constructor({name, main, weather, wind, sys}) {
    this.name = name;
    this.temp = Math.round(main.temp);
    this.description = weather[0].description;
    this.icon = weather[0].icon;
    this.alt = weather[0].main;
    this.windSpeed = Math.round(wind.speed);
    this.windDir = this.convertWindDeg(wind.deg);
    this.pressure = this.convertPressure(main.pressure);
    this.sunrise = this.convertTime(sys.sunrise);
    this.sunset = this.convertTime(sys.sunset);
  }

    convertTime(time) {
      var date = new Date(time * 1000);
      var hours = date.getHours().toString().padStart(2, '0');
      var minutes = date.getMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    }

    convertWindDeg(windDir) {
      if(windDir>337.5) { return 'Northerly' };
      if(windDir>292.5) { return 'North Westerly' };
      if(windDir>247.5) { return 'Westerly' };
      if(windDir>202.5) { return 'South Westerly' };
      if(windDir>157.5) { return 'Southerly' };
      if(windDir>122.5) { return 'South Easterly' };
      if(windDir>67.5) { return 'Easterly' };
      if(windDir>22.5) { return 'North Easterly' };
      return 'Northerly';
    }

    convertPressure(pressure) {
      return (Math.round(pressure*0.750062));
    }
  
  createElement() {
    const tr = document.createElement('tr');

    tr.insertAdjacentHTML('beforeend',
      `       <td class="table-cell city" id="cityForecast${this.name}">${this.name}</td> 
              <td class="table-cell">
                <span class="temp">${this.temp}</span><span class="sign">°</span><br/>
                <span class="description">${this.description}</span><br/>
              </td>
              <td class="table-cell">
              <span class="description">Wind: ${this.windSpeed}m/sec</span><br/>
              <span class="description">${this.windDir}</span>
              </td>
              <td class="table-cell">
              <span class="description">Pressure: ${this.pressure}mmHg</span>
              </td>
              <td class="table-cell">
              <span class="description">Sunrise: ${this.sunrise}</span><br/>
              <span class="description">Sunset: ${this.sunset}</span>
              </td>
              <td class="table-cell">
                <img src="http://openweathermap.org/img/wn/${this.icon}@2x.png" alt="${this.alt}" class="img">
              </td>
      `
    )

    return tr;
  }
  
  createElementFewDays() {
    const tr = document.createElement('tr');

    tr.insertAdjacentHTML('beforeend',
      `       <td class="table-cell city" id="cityForecast${this.name}">${this.name}</td> 
              <td class="table-cell">
                <span class="temp">${this.temp}</span><span class="sign">°</span><br/>
                <span class="description">${this.description}</span><br/>
                <span class="description">Wind speed: ${this.windSpeed}m/sec</span><br/>
                <span class="description">Wind: ${this.windDir}</span>
                <span class="description">Pressure: ${this.pressure} hPa</span>
                <span class="description">Sunrise: ${this.sunrise}</span>
                <span class="description">Sunset: ${this.sunset}</span>
                  <img src="http://openweathermap.org/img/wn/${this.icon}@2x.png" alt="${this.alt}" class="img">
                </td>
      `
    )

    return tr;
  }
}