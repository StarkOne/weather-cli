import chalk from 'chalk';
import dedent from 'dedent-js';

const pringError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const pringSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const pringHelp = () => {
  console.log(
    dedent(`
    ${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h [HELP] для вывода помощи
    -t [API_KEY] для сохранения токена
  `)
  );
};

const printWeather = (res, icon) => {
  console.log(
    dedent(`
    ${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
    ${icon} ${res.weather[0].description}
    Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
    Влажность: ${res.main.humidity}
    Скорость ветра: ${res.wind.speed}
  `)
  );
};

export { pringError, pringSuccess, pringHelp, printWeather };
