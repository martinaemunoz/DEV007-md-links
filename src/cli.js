import { mdLinks } from './index.js';
import chalk from 'chalk';

const path = process.argv[2]
console.log(chalk.green('Initializing: ', path));

mdLinks(path)
.then((res) => {
    if (typeof res === 'string') {
        console.log(chalk.green.bold(res));
    } else {
        console.log(chalk.green.bold('.md file(s) found:\n'));
        console.log(chalk.blue.bold('Links Found:\n'));
        const linkStats = res.map((link) => ({
            href: link.href,
            text: link.text,
            file: link.file,
    }));
    console.log(linkStats);
}
})
.catch((error) => {
    console.log(chalk.red.bold(error.message));
});