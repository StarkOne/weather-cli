#! /usr/bin/env node
import { getArgs } from './helpers/args.js';
import { pringHelp, pringSuccess, pringError } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
  try {
    await saveKeyValue('token', token);
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
  console.log(args);
};

initCLI();
