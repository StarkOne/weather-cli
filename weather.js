#! /usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { pringHelp, pringSuccess, pringError } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

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

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    pringHelp();
  }
  if (args.s) {
    saveKeyValue('city', args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getWeather(args.s);
};

initCLI();
