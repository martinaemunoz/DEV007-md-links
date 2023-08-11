import chalk from 'chalk';
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

// Gets the file path and command line options.
// Assigns the value of the third element in the process.argv array to the path variable.
const path = process.argv[2];
// Assigns an array to the options variable, which uses the slice method.
// Extracts a portion from the array, which will ultimately contain all the command-line arguments.
const options = process.argv.slice(3);
console.log(chalk.green('Initializing: ', path));

// Boolean variables that use the includes() method to check if the strings are found in options
// If either string is found, the variables will be assigned true, and will display either option.
const validateOption = options.includes('--validate') || options.includes('--v');
const statsOption = options.includes('--stats') || options.includes('--s');

// Output and display of results of the mdLinks function
mdLinks(path, { validate: validateOption, stats: statsOption })
  .then((res) => {
    // Promise chain that executes once the mdLinks function resolves successfully.
    if (res.length === 0) {
      // Checks if res is an empty array.
      throw new Error('No links found\n');
    }
    if (typeof res === 'string') {
      // Checks if res is a message/summary.
      console.log(chalk.green.bold(res));
    } else if (validateOption && statsOption) {
      // Extracts statistics and validation results.
      const { totalLinks, uniqueLinks, brokenLinks } = res;
      console.log(chalk.cyan.bold('\nValidation and Stats:\n'));
      console.log(chalk.blue(`Total links: ${totalLinks}`));
      console.log(chalk.blue(`Unique links: ${uniqueLinks}`));
      console.log(chalk.blue(`Broken links: ${brokenLinks}`));
      console.log(chalk.green('--------------------------'));
    } else if (validateOption) {
      // Extracts validation properties.
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
      // Extracts stats properties.
      const { totalLinks, uniqueLinks } = res;
      console.log(chalk.cyan.bold('\nStats:\n'));
      console.log(chalk.blue(`Total links: ${totalLinks}`));
      console.log(chalk.blue(`Unique links: ${uniqueLinks}`));
      console.log(chalk.green('--------------------------'));
    } else {
      // Assumes res contains a list of links without validation or statistics.
      console.log(chalk.cyan.bold('Retrieved links without validation/stats:\n'));
      console.log(res);
    }
  })
  .catch((error) => {
    // Executes if there is an error in the promise chain.
    console.log(chalk.red.bold(error.message));
  });
