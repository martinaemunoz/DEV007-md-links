// import axios from 'axios';
import path from 'path';
import {
  pathExists,
  toAbsolutePath,
  isFile,
  isDirectory,
  mdLinksRecursive,
  readMdFile,
  extName,
  validateRes,
  computeRes,
// eslint-disable-next-line import/extensions
} from './functions.js';

const computeLinks = (links, { validate, stats }) => {
  if (validate) {
    return Promise.all(links.map((link) => validateRes(link)))
      .then((validatedRes) => {
        if (stats) {
          const statsRes = computeRes(validatedRes);
          statsRes.uniqueLinks = statsRes.uniqueLinksArray.length;
          return statsRes;
        }
        return validatedRes;
      });
  }

  if (stats) {
    const statsRes = computeRes(links);
    statsRes.uniqueLinks = statsRes.uniqueLinksArray.length;
    return Promise.resolve(statsRes);
  }

  return Promise.resolve(links);
};

// eslint-disable-next-line max-len
const mdLinks = (pathUser, { validate = false, stats = false } = {}) => new Promise((resolve, reject) => {
  if (!pathExists(pathUser)) {
    reject(new Error('Invalid Path'));
  }
  if (!toAbsolutePath(pathUser)) {
    resolve(`The absolute path is: ${path.resolve(pathUser)}`);
  }
  if (isDirectory(pathUser)) {
    const mdFiles = mdLinksRecursive(pathUser);
    const promise = mdFiles.map((file) => mdLinks(file, { validate }));

    Promise.all(promise)
      .then((results) => results.flat())
      .then((links) => computeLinks(links, { validate, stats }))
      .then(resolve)
      .catch(reject);
  } else if (isFile(pathUser).isFile() && extName(pathUser) === '.md') {
    const links = readMdFile(pathUser);
    computeLinks(links, { validate, stats })
      .then(resolve)
      .catch(reject);
  } else {
    reject(
      new Error(
        'The file does not have a .md extension or is not a directory',
      ),
    );
  }
});

export default mdLinks;
