import chalk from 'chalk';
// eslint-disable-next-line import/extensions
import mdLinks from './index.js';

const path = process.argv[2];
const options = process.argv.slice(3);
console.log(chalk.green('Initializing: ', path));

// eslint-disable-next-line no-unused-vars, max-len
const validateOption = options.includes('--validate') || options.includes('--v');
const statsOption = options.includes('--stats') || options.includes('--s');

mdLinks(path, { validate: validateOption, stats: statsOption })
  .then((res) => {
    if (typeof res === 'string') {
      console.log(chalk.green.bold(res));
    } else if (validateOption && statsOption) {
      console.log(chalk.cyan.bold('Validation and Stats:\n'));
      console.log(chalk.cyan(`Total links: ${totalLinks}`));
      console.log(chalk.cyan(`Unique links: ${uniqueLinks}`));
      console.log(chalk.cyan(`Broken links: ${brokenLinks}`));
      console.log(chalk.green.bold('.md file(s) found:\n'));
      console.log(chalk.blue.bold('Links Found:\n'));
      /* console.log(res); */
    } else if (validateOption) {
      console.log(chalk.cyan('Validation\n'));
      res.forEach((link) => {
        const {
          href, text, file, status,
        } = link;
        const ok = status >= 200 && status < 400 ? 'OK' : 'FAIL';
        console.log(chalk.magenta(`href: ${href}`));
        console.log(chalk.magenta(`text: ${text}`));
        console.log(chalk.magenta(`file: ${file}`));
        console.log(chalk.magenta(`status: ${status}`));
        console.log(chalk.magenta(`ok: ${ok}\n`));
      });
    } else if (statsOption) {
      const { totalLinks, uniqueLinks } = res;
      console.log(chalk.cyan('Stats\n'));
      console.log(chalk.magenta(`Total links: ${totalLinks}`));
      console.log(chalk.magenta(`Unique links: ${uniqueLinks}`));
    } else {
      console.log('Links found:\n');
      console.log(res);
    }
  })
  .catch((error) => {
    console.log(chalk.red.bold(error.message));
  });
