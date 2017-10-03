import * as R from 'ramda';
import * as moment from 'moment';
import * as request from 'request-promise-native';

import { ISettings } from './settings';

export interface IDayForecast {
  date: moment.Moment;
  highTemp: number;
  lowTemp: number;
  weather: string;
}

export interface IWeatherData {
  currentTemp: number;
  forecast: IDayForecast[];
}

export const getCurrentWeather = async (settings: ISettings): Promise<IWeatherData> => {
  const currentTemp: any = await request(`https://api.openweathermap.org/data/2.5/weather?zip=${settings.zipcode}&APPID=${settings.weatherApiKey}&units=imperial`, { json: true });
  const forecast: any = await request(`https://api.openweathermap.org/data/2.5/forecast?zip=${settings.zipcode}&APPID=${settings.weatherApiKey}&units=imperial`, { json: true });

  const forecast3 = R.take(3, forecastByDay(forecast.list));

  return {
    currentTemp: Math.round(currentTemp.main.temp),
    forecast: forecast3,
  };
};

const milliPerDay = 1000 * 60 * 60 * 24;
const forecastByDay = (forecasts: any[]): IDayForecast[] => {
  const today = new Date();
  let dayOfMonth = moment().date();
  let count = 0;

  const forecastsByDay = R.groupBy(f => {
    const day = moment(f.dt * 1000);
    if (day.date() === dayOfMonth) {
      return count.toString();
    }
    dayOfMonth = day.date();
    count++;
    return count.toString();
  },
    forecasts);

  const daysForecast = Object.keys(forecastsByDay).map((i: string) =>
    consolidate(forecastsByDay[i]),
  );

  return daysForecast;
};

const consolidate = (f: any[]): IDayForecast => {
  const fcast: IDayForecast = f.reduce((forecast, day): IDayForecast => {
    const newForecast = {
      highTemp: Math.max(forecast.highTemp, Math.round(day.main.temp_max)),
      lowTemp: Math.min(forecast.lowTemp, Math.round(day.main.temp_min)),
      weather: forecast.weather,
      date: forecast.date,
    };
    return newForecast;
  }, {
    highTemp: -1000,
    lowTemp: 1000,
    weather: '',
    date: moment(),
  } as IDayForecast);

  // Get most common weather forecast
  const weatherForecasts: string[] = f.map(d => R.head<any>(d.weather).main);
  const weatherPairs: any = R.compose(
    R.reverse,
    R.sortBy(a => a[1]),
    R.toPairs,
    R.countBy<string>(a => a))
    (weatherForecasts);
  fcast.weather = R.head(R.head(weatherPairs));

  fcast.date = moment(R.head(f).dt * 1000);

  return fcast;
};

const toDayForcast = (f: any): IDayForecast => {
  return {
    highTemp: Math.round(f.main.temp_max),
    lowTemp: Math.round(f.main.temp_min),
    weather: R.head<any>(f.weather).main,
    date: moment(f.dt * 1000),
  };
};
