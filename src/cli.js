import chalk from 'chalk';
// eslint-disable-next-line import/extensions, import/no-extraneous-dependencies
import figlet from 'figlet';
// eslint-disable-next-line import/extensions
import mdLinks from './index.js';

const banner = () => {
  const bannerText = figlet.textSync('Md-Links\n', {
    font: 'train',
    horizontalLayout: 'fitted',
    verticalLayout: 'default',
  });
  const bannerHue = chalk.magenta.bold(bannerText);

  console.log(bannerHue);
};

banner();

const path = process.argv[2];
const options = process.argv.slice(3);
console.log(chalk.green('Initializing: ', path));

// eslint-disable-next-line no-unused-vars, max-len
const validateOption = options.includes('--validate') || options.includes('--v');
const statsOption = options.includes('--stats') || options.includes('--s');

mdLinks(path, { validate: validateOption, stats: statsOption })
  .then((res) => {
    if (res.length === 0) {
      throw new Error('No links found\n');
    }
    if (typeof res === 'string') {
      console.log(chalk.green.bold(res));
    } else if (validateOption && statsOption) {
      const { totalLinks, uniqueLinks, brokenLinks } = res;
      console.log(chalk.cyan.bold('\nValidation and Stats:\n'));
      console.log(chalk.blue(`Total links: ${totalLinks}`));
      console.log(chalk.blue(`Unique links: ${uniqueLinks}`));
      console.log(chalk.blue(`Broken links: ${brokenLinks}`));
      console.log(chalk.green('--------------------------'));
    } else if (validateOption) {
      console.log(chalk.cyan.bold('\nValidation:\n'));
      res.forEach((link) => {
        const {
          href, text, file, status,
        } = link;
        const ok = status >= 200 && status < 400 ? 'OK' : 'FAIL';
        console.log(chalk.blue(`href: ${href}`));
        console.log(chalk.blue(`text: ${text}`));
        console.log(chalk.blue(`file: ${file}`));
        console.log(chalk.blue(`status: ${status}`));
        console.log(chalk.blue(`ok: ${ok}`));
        console.log(chalk.green('-+-°-o-o-0-0-0-0-0-0-0-0-0-0-0-0-o-o-°-+-'));
      });
    } else if (statsOption) {
      const { totalLinks, uniqueLinks } = res;
      console.log(chalk.cyan.bold('\nStats:\n'));
      console.log(chalk.blue(`Total links: ${totalLinks}`));
      console.log(chalk.blue(`Unique links: ${uniqueLinks}`));
      console.log(chalk.green('--------------------------'));
    } else {
      console.log(chalk.cyan.bold('Retrieved links without validation/stats:\n'));
      console.log(res);
    }
  })
  .catch((error) => {
    console.log(chalk.red.bold(error.message));
  });
