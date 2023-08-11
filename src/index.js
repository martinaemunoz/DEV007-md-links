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

// Fx that processes an array of links and an options object,
// with validate and stats boolean properties.
const computeLinks = (links, { validate, stats }) => {
  if (validate) {
    // If validate is true, it uses Promise.all() to perform link validation for each link
    // in the links array using the validateRes function.
    return Promise.all(links.map((link) => validateRes(link)))
      .then((validatedRes) => {
        if (stats) {
        // If stats is also true, it calculates statistics and updates uniqueLinks
          const statsRes = computeRes(validatedRes);
          statsRes.uniqueLinks = statsRes.uniqueLinksArray.length;
          return statsRes;
        }
        // If stats is not true, it returns the array of validated results.
        return validatedRes;
      });
  }

  if (stats) {
    // If only stats is true (and validate is not), it calculates statistics
    // for the original links array using the computeRes fx.
    const statsRes = computeRes(links);
    statsRes.uniqueLinks = statsRes.uniqueLinksArray.length;
    return Promise.resolve(statsRes);
  }
  // If neither validate nor stats is true, it simply returns the original links array.
  return Promise.resolve(links);
};

// Main fx that returns a promise that resolves with the extracted and analyzed links.
// eslint-disable-next-line max-len
const mdLinks = (pathUser, { validate = false, stats = false } = {}) => new Promise((resolve, reject) => {
  if (!pathExists(pathUser)) {
    // It first checks if the provided pathUser exists and is a valid path.
    // If not, it rejects the promise with an error indicating an invalid path.
    reject(new Error('Invalid Path'));
  }
  if (!toAbsolutePath(pathUser)) {
    // If the path is valid, it then checks if the path should be converted to an absolute path.
    // If so, it resolves the promise with the absolute path.
    resolve(`The absolute path is: ${path.resolve(pathUser)}`);
  }
  if (isDirectory(pathUser)) {
    // If the pathUser is a directory, it recursively retrieves .md files,
    // extracts and processes links from each file, and then computes results.
    const mdFiles = mdLinksRecursive(pathUser);
    // Creates an array of promises to call mdLinks for each .md file found.
    const promiseArray = mdFiles.map((file) => mdLinks(file, { validate }));
    // Resolves all created promises and flattens the result to get an array of links.
    Promise.all(promiseArray)
      .then((results) => results.flat())
      .then((links) => computeLinks(links, { validate, stats }))
      .then(resolve)
      .catch(reject);
  } else if (isFile(pathUser).isFile() && extName(pathUser) === '.md') {
    // If pathUser is an .md file, it reads the file using readMdFile,
    // processes links, and computes results using the computeLinks function.
    const links = readMdFile(pathUser);
    computeLinks(links, { validate, stats })
      .then(resolve)
      .catch(reject);
  } else {
    // If pathUser is neither a directory nor an .md file, it rejects the promise with an error.
    reject(
      new Error(
        'The file does not have a .md extension or is not a directory',
      ),
    );
  }
});

export default mdLinks;
