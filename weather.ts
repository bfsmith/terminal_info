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
  // const currentTemp: any = await request(`https://api.openweathermap.org/data/2.5/weather?zip=${settings.zipcode}&APPID=${settings.weatherApiKey}&units=imperial`, { json: true });
  // const forecast: any = await request(`https://api.openweathermap.org/data/2.5/forecast?zip=${settings.zipcode}&APPID=${settings.weatherApiKey}&units=imperial`, { json: true });
  const currentTemp = JSON.parse('{"coord":{"lon":-96.68,"lat":33.03},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"stations","main":{"temp":91.92,"pressure":1014,"humidity":41,"temp_min":91.4,"temp_max":93.2},"visibility":20921,"wind":{"speed":10.33,"deg":166.501},"clouds":{"all":40},"dt":1506111300,"sys":{"type":1,"id":2596,"message":0.0042,"country":"US","sunrise":1506082539,"sunset":1506126108},"id":0,"name":"Plano","cod":200}');
  const forecast = JSON.parse('{"cod":"200","message":0.0076,"cnt":40,"list":[{"dt":1506114000,"main":{"temp":94.19,"temp_min":91.47,"temp_max":94.19,"pressure":1005.99,"sea_level":1025.47,"grnd_level":1005.99,"humidity":53,"temp_kf":1.51},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":20},"wind":{"speed":10.33,"deg":166.501},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-09-22 21:00:00"},{"dt":1506124800,"main":{"temp":91.45,"temp_min":89.42,"temp_max":91.45,"pressure":1005.3,"sea_level":1024.71,"grnd_level":1005.3,"humidity":45,"temp_kf":1.14},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":10.18,"deg":150.5},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-09-23 00:00:00"},{"dt":1506135600,"main":{"temp":84.38,"temp_min":83.01,"temp_max":84.38,"pressure":1006.33,"sea_level":1025.9,"grnd_level":1006.33,"humidity":51,"temp_kf":0.76},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":9.42,"deg":138.009},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-09-23 03:00:00"},{"dt":1506146400,"main":{"temp":79.66,"temp_min":78.97,"temp_max":79.66,"pressure":1006.91,"sea_level":1026.53,"grnd_level":1006.91,"humidity":57,"temp_kf":0.38},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":8.19,"deg":152.001},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-09-23 06:00:00"},{"dt":1506157200,"main":{"temp":75.53,"temp_min":75.53,"temp_max":75.53,"pressure":1007.2,"sea_level":1026.95,"grnd_level":1007.2,"humidity":66,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":6.53,"deg":157.502},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-09-23 09:00:00"},{"dt":1506168000,"main":{"temp":72.35,"temp_min":72.35,"temp_max":72.35,"pressure":1007.8,"sea_level":1027.46,"grnd_level":1007.8,"humidity":78,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":3.94,"deg":166.001},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-09-23 12:00:00"},{"dt":1506178800,"main":{"temp":83.38,"temp_min":83.38,"temp_max":83.38,"pressure":1008.5,"sea_level":1028.13,"grnd_level":1008.5,"humidity":62,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":4.38,"deg":159.005},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-09-23 15:00:00"},{"dt":1506189600,"main":{"temp":89.98,"temp_min":89.98,"temp_max":89.98,"pressure":1007.53,"sea_level":1026.9,"grnd_level":1007.53,"humidity":58,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":8.1,"deg":147.013},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-09-23 18:00:00"},{"dt":1506200400,"main":{"temp":91.93,"temp_min":91.93,"temp_max":91.93,"pressure":1004.82,"sea_level":1024.3,"grnd_level":1004.82,"humidity":47,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":10.54,"deg":139.004},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-09-23 21:00:00"},{"dt":1506211200,"main":{"temp":88.77,"temp_min":88.77,"temp_max":88.77,"pressure":1004.34,"sea_level":1023.71,"grnd_level":1004.34,"humidity":43,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":36},"wind":{"speed":11.01,"deg":128},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-09-24 00:00:00"},{"dt":1506222000,"main":{"temp":84.78,"temp_min":84.78,"temp_max":84.78,"pressure":1005.22,"sea_level":1024.77,"grnd_level":1005.22,"humidity":45,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":8},"wind":{"speed":10.22,"deg":127.006},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-09-24 03:00:00"},{"dt":1506232800,"main":{"temp":79.06,"temp_min":79.06,"temp_max":79.06,"pressure":1005.01,"sea_level":1024.61,"grnd_level":1005.01,"humidity":52,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":9.66,"deg":136},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-09-24 06:00:00"},{"dt":1506243600,"main":{"temp":76.02,"temp_min":76.02,"temp_max":76.02,"pressure":1004.75,"sea_level":1024.42,"grnd_level":1004.75,"humidity":62,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":8.77,"deg":155.504},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-09-24 09:00:00"},{"dt":1506254400,"main":{"temp":74.84,"temp_min":74.84,"temp_max":74.84,"pressure":1005.16,"sea_level":1024.84,"grnd_level":1005.16,"humidity":69,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":20},"wind":{"speed":7.38,"deg":173.001},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-09-24 12:00:00"},{"dt":1506265200,"main":{"temp":83.93,"temp_min":83.93,"temp_max":83.93,"pressure":1006.3,"sea_level":1025.83,"grnd_level":1006.3,"humidity":57,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02d"}],"clouds":{"all":8},"wind":{"speed":6.62,"deg":194.501},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-09-24 15:00:00"},{"dt":1506276000,"main":{"temp":89.41,"temp_min":89.41,"temp_max":89.41,"pressure":1005.04,"sea_level":1024.55,"grnd_level":1005.04,"humidity":55,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":9.89,"deg":166.5},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-09-24 18:00:00"},{"dt":1506286800,"main":{"temp":91.1,"temp_min":91.1,"temp_max":91.1,"pressure":1002.86,"sea_level":1022.17,"grnd_level":1002.86,"humidity":46,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02d"}],"clouds":{"all":8},"wind":{"speed":11.88,"deg":154.002},"sys":{"pod":"d"},"dt_txt":"2017-09-24 21:00:00"},{"dt":1506297600,"main":{"temp":88.13,"temp_min":88.13,"temp_max":88.13,"pressure":1002.55,"sea_level":1021.92,"grnd_level":1002.55,"humidity":42,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":44},"wind":{"speed":11.21,"deg":138.007},"sys":{"pod":"n"},"dt_txt":"2017-09-25 00:00:00"},{"dt":1506308400,"main":{"temp":83.56,"temp_min":83.56,"temp_max":83.56,"pressure":1003.5,"sea_level":1023.01,"grnd_level":1003.5,"humidity":47,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":24},"wind":{"speed":11.65,"deg":124.502},"sys":{"pod":"n"},"dt_txt":"2017-09-25 03:00:00"},{"dt":1506319200,"main":{"temp":80.91,"temp_min":80.91,"temp_max":80.91,"pressure":1003.57,"sea_level":1023.08,"grnd_level":1003.57,"humidity":53,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":20},"wind":{"speed":11.52,"deg":143},"sys":{"pod":"n"},"dt_txt":"2017-09-25 06:00:00"},{"dt":1506330000,"main":{"temp":78.56,"temp_min":78.56,"temp_max":78.56,"pressure":1003.12,"sea_level":1022.68,"grnd_level":1003.12,"humidity":58,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":48},"wind":{"speed":11.32,"deg":144.003},"sys":{"pod":"n"},"dt_txt":"2017-09-25 09:00:00"},{"dt":1506340800,"main":{"temp":78.31,"temp_min":78.31,"temp_max":78.31,"pressure":1003.17,"sea_level":1022.93,"grnd_level":1003.17,"humidity":59,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":32},"wind":{"speed":10.65,"deg":177.002},"sys":{"pod":"n"},"dt_txt":"2017-09-25 12:00:00"},{"dt":1506351600,"main":{"temp":83.12,"temp_min":83.12,"temp_max":83.12,"pressure":1004.41,"sea_level":1023.95,"grnd_level":1004.41,"humidity":57,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":12},"wind":{"speed":9.66,"deg":186.503},"sys":{"pod":"d"},"dt_txt":"2017-09-25 15:00:00"},{"dt":1506362400,"main":{"temp":88.66,"temp_min":88.66,"temp_max":88.66,"pressure":1003.58,"sea_level":1023.05,"grnd_level":1003.58,"humidity":53,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":12.66,"deg":172.503},"sys":{"pod":"d"},"dt_txt":"2017-09-25 18:00:00"},{"dt":1506373200,"main":{"temp":90.37,"temp_min":90.37,"temp_max":90.37,"pressure":1001.12,"sea_level":1020.56,"grnd_level":1001.12,"humidity":46,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":24},"wind":{"speed":11.99,"deg":165.502},"sys":{"pod":"d"},"dt_txt":"2017-09-25 21:00:00"},{"dt":1506384000,"main":{"temp":86.8,"temp_min":86.8,"temp_max":86.8,"pressure":1001.23,"sea_level":1020.64,"grnd_level":1001.23,"humidity":46,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":92},"wind":{"speed":9.86,"deg":162.502},"sys":{"pod":"n"},"dt_txt":"2017-09-26 00:00:00"},{"dt":1506394800,"main":{"temp":81.39,"temp_min":81.39,"temp_max":81.39,"pressure":1002.65,"sea_level":1022.18,"grnd_level":1002.65,"humidity":68,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":100},"wind":{"speed":8.97,"deg":163},"rain":{"3h":0.46},"sys":{"pod":"n"},"dt_txt":"2017-09-26 03:00:00"},{"dt":1506405600,"main":{"temp":75.84,"temp_min":75.84,"temp_max":75.84,"pressure":1003.37,"sea_level":1022.83,"grnd_level":1003.37,"humidity":78,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":36},"wind":{"speed":8.43,"deg":194.001},"rain":{"3h":0.4},"sys":{"pod":"n"},"dt_txt":"2017-09-26 06:00:00"},{"dt":1506416400,"main":{"temp":76.06,"temp_min":76.06,"temp_max":76.06,"pressure":1003.61,"sea_level":1023.14,"grnd_level":1003.61,"humidity":77,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":76},"wind":{"speed":6.4,"deg":187.506},"rain":{},"sys":{"pod":"n"},"dt_txt":"2017-09-26 09:00:00"},{"dt":1506427200,"main":{"temp":74.05,"temp_min":74.05,"temp_max":74.05,"pressure":1004.31,"sea_level":1024.07,"grnd_level":1004.31,"humidity":87,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":56},"wind":{"speed":3.94,"deg":180.002},"rain":{"3h":0.96},"sys":{"pod":"n"},"dt_txt":"2017-09-26 12:00:00"},{"dt":1506438000,"main":{"temp":79.22,"temp_min":79.22,"temp_max":79.22,"pressure":1005.16,"sea_level":1024.71,"grnd_level":1005.16,"humidity":74,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":36},"wind":{"speed":3.62,"deg":100.501},"rain":{"3h":0.21},"sys":{"pod":"d"},"dt_txt":"2017-09-26 15:00:00"},{"dt":1506448800,"main":{"temp":87.57,"temp_min":87.57,"temp_max":87.57,"pressure":1004.11,"sea_level":1023.62,"grnd_level":1004.11,"humidity":60,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":24},"wind":{"speed":11.65,"deg":151.001},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-09-26 18:00:00"},{"dt":1506459600,"main":{"temp":89.94,"temp_min":89.94,"temp_max":89.94,"pressure":1002,"sea_level":1021.5,"grnd_level":1002,"humidity":50,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":24},"wind":{"speed":12.1,"deg":143.001},"rain":{},"sys":{"pod":"d"},"dt_txt":"2017-09-26 21:00:00"},{"dt":1506470400,"main":{"temp":86.76,"temp_min":86.76,"temp_max":86.76,"pressure":1001.86,"sea_level":1021.34,"grnd_level":1001.86,"humidity":50,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"lightrain","icon":"10n"}],"clouds":{"all":64},"wind":{"speed":10.42,"deg":159.003},"rain":{"3h":0.19},"sys":{"pod":"n"},"dt_txt":"2017-09-27 00:00:00"},{"dt":1506481200,"main":{"temp":82.02,"temp_min":82.02,"temp_max":82.02,"pressure":1003.42,"sea_level":1023.09,"grnd_level":1003.42,"humidity":64,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":88},"wind":{"speed":8.41,"deg":182.001},"rain":{"3h":0.32},"sys":{"pod":"n"},"dt_txt":"2017-09-27 03:00:00"},{"dt":1506492000,"main":{"temp":72.67,"temp_min":72.67,"temp_max":72.67,"pressure":1004.96,"sea_level":1024.42,"grnd_level":1004.96,"humidity":86,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":8.97,"deg":279},"rain":{"3h":1.17},"sys":{"pod":"n"},"dt_txt":"2017-09-27 06:00:00"},{"dt":1506502800,"main":{"temp":72.49,"temp_min":72.49,"temp_max":72.49,"pressure":1004.61,"sea_level":1024.2,"grnd_level":1004.61,"humidity":89,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":56},"wind":{"speed":2.62,"deg":316.5},"rain":{"3h":0.03},"sys":{"pod":"n"},"dt_txt":"2017-09-27 09:00:00"},{"dt":1506513600,"main":{"temp":72.58,"temp_min":72.58,"temp_max":72.58,"pressure":1004.94,"sea_level":1024.72,"grnd_level":1004.94,"humidity":88,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":68},"wind":{"speed":4.41,"deg":354.002},"rain":{"3h":0.05},"sys":{"pod":"n"},"dt_txt":"2017-09-27 12:00:00"},{"dt":1506524400,"main":{"temp":74.76,"temp_min":74.76,"temp_max":74.76,"pressure":1006.55,"sea_level":1026.21,"grnd_level":1006.55,"humidity":88,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":6.64,"deg":0.00256348},"rain":{"3h":0.38},"sys":{"pod":"d"},"dt_txt":"2017-09-27 15:00:00"},{"dt":1506535200,"main":{"temp":73.09,"temp_min":73.09,"temp_max":73.09,"pressure":1006.82,"sea_level":1026.46,"grnd_level":1006.82,"humidity":100,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":7.72,"deg":29.5017},"rain":{"3h":7.31},"sys":{"pod":"d"},"dt_txt":"2017-09-27 18:00:00"}],"city":{"name":"Plano","coord":{"lat":33.0277,"lon":-96.6777},"country":"US"}}');

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
