import * as fs from 'fs';
import * as readline from 'readline';

import { homedir } from 'os';
import { join } from 'path';
import { prompt } from 'inquirer';

const file = join(homedir(), '/.info_rc');

export interface ISettings {
  weatherApiKey: string | undefined;
  zipcode: string;
}

export const getSettings = async (): Promise<ISettings> => {
  let settings = readSettings(file);
  if (!settings) {
    settings = await promptSettings();
    writeSettings(file, settings);
  }
  return settings;
};

const readSettings = (settingsFile: string): ISettings | undefined => {
  if (!fs.existsSync(settingsFile)) {
    return undefined;
  }
  try {
    const settings: ISettings = JSON.parse(fs.readFileSync(settingsFile, 'utf8'));
    return settings;
  } catch (error) {
    return undefined;
  }
};

const writeSettings = (settingsFile: string, settings: ISettings): void => {
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), 'utf8');
};

const promptSettings = async (): Promise<ISettings> => {
  return {
    weatherApiKey: process.env.INFO_WEATHER_API_KEY,
    zipcode: await input('Zipcode: '),
  };
};

const input = (question: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, answer => {
      resolve(answer);
      rl.close();
    });
  });
};
