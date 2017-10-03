#!/usr/bin/env node

import * as C from 'chalk';
import * as commander from 'commander';
import * as format from './format';
import * as moment from 'moment';

import { IBatteryStats, ICPUStats, IMemoryStats, ISystemInformation, getSystemInfo } from './system';
import { IDayForecast, IWeatherData, getCurrentWeather } from './weather';
import { ISettings, getSettings } from './settings';

/* Weather */

const printWeather = (weather: IWeatherData): string => {
  return [`It's currently ${weather.currentTemp}°F.`]
    .concat(weather.forecast.map(printWeatherForecast)).join('\n');
};
const printWeatherForecast = (f: IDayForecast): string => {
  const dayTitle = isToday(f.date)
    ? 'Today'
    : isTomorrow(f.date)
      ? 'Tomorrow'
      : f.date.format('dddd');
  return `${dayTitle}: ${format.formatHighTemp(f.highTemp)}/${format.formatLowTemp(f.lowTemp)} °F and ${format.formatWeather(f.weather)}`;
};

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

/* System Info */
const printBattery = (battery: IBatteryStats): string => {
  if (!battery.hasBattery) {
    return '';
  }
  return `Battery: ${format.formatBatteryLevel(battery.level)}% (${format.formatBatteryCharging(battery)})`;
};

const printSystemInfo = (sysInfo: ISystemInformation): string => {
  return `CPU: ${format.formatCpuLoad(sysInfo.cpu.load)}%, ${format.formatCpuTemp(sysInfo.cpu.temp)}°F
${format.formatMemoryUsage(sysInfo.memory)}
${printBattery(sysInfo.battery)}`;
};

(async () => {
  const command = commander.version('1.0.0')
    .option('-s, --system', 'Show system information')
    .option('-w, --weather', 'Show weather information')
    .allowUnknownOption(true)
    .parse(process.argv);

  const args = process.argv.length == 2 ? ['-s', '-w'] : process.argv.slice(2);
  const results = await Promise.all(args.map(async (a: string) => {
    try {
      if (a === '-s' || a === '--system') {
        return printSystemInfo(await getSystemInfo());
      }
      if (a === '-w' || a === '--weather') {
          const settings = await getSettings();
          const weather = await getCurrentWeather(settings);
          return printWeather(weather);
      }
    } catch (error) {
      console.error('There was an error... ', error);
    }
    return undefined;
  })
    .filter(p => p !== undefined),
  );

  console.log(results.join('\n'));
})();
