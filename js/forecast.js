export class Forecast {
  constructor({name, main, weather, wind, sys, dt}, cityId) {
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
    this.dateFull = this.convertDate(dt);
    this.tempMin = Math.round(main.temp_min);
    this.tempMax = Math.round(main.temp_max);
    this.cityId = cityId;
  }

    convertTime(time) {
      var date = new Date(time * 1000);
      var hours = date.getHours().toString().padStart(2, '0');
      var minutes = date.getMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    }

    convertDate(date) {
      var dateForecast = new Date(date * 1000);
      var day = dateForecast.getDate().toString().padStart(2, '0');
      var month = (dateForecast.getMonth() + 1).toString().padStart(2, '0'); //to plus 1 due to method return values from 0 to 11
      var year = dateForecast.getFullYear();

      return `${day}.${month}.${year}`;
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

    static minMaxTemp(list) {
      const currentDate = new Date(list[0].dt * 1000);
      // const currentDay = currentDate.getDate();
      // const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');;
      // const currentYear = currentDate.getFullYear();
      const arrayFiveDays = []; 
      const dailyForecast = [];
      for(let i = 0; i < 5; i++) {
        const nextDay = new Date(currentDate);
        arrayFiveDays.push(nextDay); //array of dates for 5 days
        currentDate.setDate(currentDate.getDate() + 1); //set next day after current

      //get array with date for a day which is equal array nextDay. arrayList - array of several time's values for a day.
      const arrayList = list.filter((function (item) {
        const itemDate = new Date(item.dt * 1000);
        return Forecast.compareDates(itemDate, nextDay);
      }));

      let aaa = 0;
  
      //determine min and max temp for day
      let elementMin = arrayList.map((item) => item.main.temp_min);  
      const minimum = Math.min(...elementMin);
      
      let elementMax = arrayList.map((item) => item.main.temp_max); 
      const maximum = Math.max(...elementMax);

      //array with daily data (date, min temp and max temp)
      dailyForecast.push(arrayList[0]);
      arrayList[0].main.temp_min = minimum;
      arrayList[0].main.temp_max = maximum;
    }
    return dailyForecast;
  }

    //compare itemDay which takes from list for all days forecast in api and nextDay, which takes from currentDay
    static compareDates(date1, date2) {
      const day1 = date1.getUTCDate();
      const month1 = date1.getUTCMonth();
      const year1 = date1.getUTCFullYear();
      const day2 = date2.getUTCDate();
      const month2 = date2.getUTCMonth();
      const year2 = date2.getUTCFullYear();

      return day1 === day2 && month1 === month2 && year1 === year2;
    }
  
    createElement() {
    const tr = document.createElement('tr');

    tr.insertAdjacentHTML('beforeend',
      `       <td class="table-cell city" id="${this.cityId}">${this.name}</td> 
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
  
  createElementFewDays(tr) {
    tr.insertAdjacentHTML('beforeend',
      `       <td class="table-cell" id="cityForecast${this.name}">${this.dateFull} 
                <span class="description">Min: ${this.tempMin}°</span><br/>
                <span class="description">Max: ${this.tempMax}°</span>
                
                </td>
      `
    )
    return tr;
  }
}