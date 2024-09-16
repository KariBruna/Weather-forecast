export class Forecast {
  constructor({name, main, weather, wind, sys}) {
    this.name = name;
    this.temp = main.temp;
    this.description = weather[0].description;
    this.icon = weather[0].icon;
    this.alt = weather[0].main;
    this.windSpeed = Math.round(wind.speed);
    // this.windDir = wind.direction.name;
    this.pressure = main.pressure;
    this.sunrise = this.convertTime(sys.sunrise);
    this.sunset = this.convertTime(sys.sunset);
  }

    convertTime(time) {
      var date = new Date(time * 1000);
      var hours = date.getHours();
      var minutes = date.getMinutes();

      return `${hours}:${minutes}`;
    }
  
  createElement() {
    const tr = document.createElement('tr');

    tr.insertAdjacentHTML('beforeend',
      `       <td class="table-cell city">${this.name}</td>
              <td class="table-cell">
                <span class="temp">${this.temp}</span><span class="sign">°</span><br/>
                <span class="description">${this.description}</span><br/>
              </td>
              <td class="table-cell">
              <span class="description">Wind speed: ${this.windSpeed}m/sec</span>
              </td>
              <td class="table-cell">
              <span class="description">Pressure: ${this.pressure} hPa</span>
              </td>
              <td class="table-cell">
              <span class="description">Sunrise: ${this.sunrise}</span>
              <span class="description">Sunset: ${this.sunset}</span>
              </td>
              <td class="table-cell">
                <img src="http://openweathermap.org/img/wn/${this.icon}@2x.png" alt="${this.alt}" class="img">
              </td>
      `
    )

    return tr;
  }
}