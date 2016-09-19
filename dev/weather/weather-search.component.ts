import {Component} from 'angular2/core';
import {ControlGroup} from 'angular2/common';
import {WeatherService} from './weather.service';
import {WeatherItem} from './weather-item';

@Component({
  selector: 'weather-search',
  template: `
    <section class="weather-search">
      <form (ngSubmit)="onSubmit(f)" #f="ngForm">
        <label for="city">City</label>
        <input ngControl="location" type="text" id="city" required/>
        <button type="submit">Add city</button>
      </form>
      <div>
        <span class="info">City found:</span> City Name
      </div>
    </section>
 `,
  providers: [WeatherService]
})
export class WeatherSearchComponent {
  constructor(private _weatherService: WeatherService) {}

  onSubmit(form: ControlGroup) {
    this._weatherService.searchWeatherData(form.value.location)
      .subscribe(data => {
        const weatherItem = new WeatherItem(data.name, data.weather[0].main, data.main.temp);
        this._weatherService.addWeatherItem(weatherItem);
      });
  }
}