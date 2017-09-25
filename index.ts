#!/usr/bin/env node

import * as format from './format';
import * as moment from 'moment';

import { IDayForecast, getCurrentWeather } from './weather';
import { ISettings, getSettings } from './settings';

const printWeather = (f: IDayForecast): void => {
  const dayTitle = isToday(f.date)
    ? 'Today'
    : isTomorrow(f.date)
      ? 'Tomorrow'
      : f.date.format('dddd');
  console.log(`${dayTitle}: ${format.formatHighTemp(f.highTemp)}/${format.formatLowTemp(f.lowTemp)} °F and ${format.formatWeather(f.weather)}`);
};

(async () => {
  try {
    const settings = await getSettings();
    const weather = await getCurrentWeather(settings);
    console.log(`It's currently ${weather.currentTemp}°F.`);
    weather.forecast.forEach(printWeather);
  } catch (error) {
    console.error('There was an error... ', error);
  }
})();

const isToday = (date: moment.Moment): boolean => {
  const now = moment();
  return date.year() === now.year()
    && date.month() === now.month()
    && date.date() === now.date();
};
const isTomorrow = (date: moment.Moment): boolean => {
  const tomorrow = moment().add(1, 'day');
  return date.year() === tomorrow.year()
    && date.month() === tomorrow.month()
    && date.date() === tomorrow.date();
};
