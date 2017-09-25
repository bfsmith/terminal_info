import * as C from 'chalk';

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
