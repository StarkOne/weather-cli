#! /usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import { pringHelp, pringSuccess, pringError, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    pringError('Не передан токен!');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    pringSuccess('Токет сохранен');
  } catch (error) {
    pringError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    pringError('Не передан город!');
    return;
  }
  try {
    const weather = await getWeather(city);
    if (weather.name) {
      await saveKeyValue(TOKEN_DICTIONARY.city, city);
      pringSuccess('Город сохранен!');
    }
    return true;
  } catch (error) {
    if (error?.response?.status == 404) {
      pringError('Неверно указан город!');
    } else if (error?.response?.status == 401) {
      pringError('Для проверки города нужно указать токен!');
    } else {
      pringError(error.message);
    }
    return false;
  }
};

const getForcast = async () => {
  try {
    const city = await getKeyValue(TOKEN_DICTIONARY.city);
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
    return weather;
  } catch (error) {
    if (error?.response?.status == 404) {
      pringError('Неверно указан город!');
    } else if (error?.response?.status == 401) {
      pringError('Неверно указан токен!');
    } else {
      pringError(error.message);
    }
  }
};

const initCLI = async () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return pringHelp();
  }
  if (args.s) {
    const statusCity = await saveCity(args.s);
    if (!statusCity) {
      return;
    }
  }
  if (args.t) {
    return saveToken(args.t);
  }
  return getForcast();
};

initCLI();
