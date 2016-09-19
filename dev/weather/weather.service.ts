import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {WEATHER_ITEMS} from './weather.data';
import {WeatherItem} from './weather-item';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {
  constructor(private _http: Http) {}

  addWeatherItem(weatherItem: WeatherItem) {
    WEATHER_ITEMS.push(weatherItem);
  }

  getWeatherItems() {
    return WEATHER_ITEMS;
  }

  //TODO: before using change KEEEEEY to your API key
  searchWeatherData(cityName: string): Observable<any> {
     return this._http.get('http://api.openweathermap.org/data/2.5/weather' +
       '?q=' + cityName + '&APPID=KEEEEEY&units=metric')
     .map(response => response.json())
     .catch(error => {
       console.log(error);
       return Observable.throw(error.json());
     });
  }
}