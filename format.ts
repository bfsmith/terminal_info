import * as C from 'chalk';

import { IBatteryStats } from './system';

export const formatHighTemp = (temp: number): string => C.red(`${temp}`);
export const formatLowTemp = (temp: number): string => C.blue(`${temp}`);
export const formatWeather = (weather: string): string => {
  switch (weather) {
    case 'Clear':
      return C.white(weather);
    case 'Clouds':
      return C.gray(weather);
    default:
      return weather;
  }
};

export const formatCpuTemp = (temp: number): string => {
  const l = Math.round(temp).toString();
  if (temp >= 140) {
    return C.red(l);
  }
  if (temp >= 100) {
    return C.yellow(l);
  }
  return C.green(l);
};

export const formatCpuLoad = (load: number): string => {
  const l = Math.round(load).toString();
  if (load >= 90) {
    return C.red(l);
  }
  if (load >= 25) {
    return C.yellow(l);
  }
  return C.green(l);
};

export const formatBatteryLevel = (level: number): string => {
  const l = Math.round(level).toString();
  if (level > 66) {
    return C.green(l);
  }
  if (level > 33) {
    return C.yellow(l);
  }
  if (level > 15) {
    return C.red(l);
  }
  // <= 15%
  return C.underline.red(l);
};

export const formatBatteryCharging = (battery: IBatteryStats): string => {
  return battery.isCharging
    ? C.green('charging')
    : (battery.level > 95
      ? C.blue('charged')
      : C.yellow('not charging'));
};
