export class Forecast {
  constructor({name, main, weather}) {
    this.name = name;
    this.temp = main.temp;
    this.description = weather[0].description;
    this.icon = weather[0].icon;
    this.alt = weather[0].main;
  }

  createElement() {
    const tr = document.createElement('tr');

    tr.insertAdjacentHTML('beforeend',
      `       <td class="table-cell city">${this.name}</td>
              <td class="table-cell">
                <span class="temp">${this.temp}</span><span class="sign">°</span><br/>
                <span class="description">${this.description}</span>
              </td>
              <td class="table-cell">
                <img src="http://openweathermap.org/img/wn/${this.icon}@2x.png" alt="${this.alt}" class="img">
              </td>
      `
    )

    return tr
  }
}