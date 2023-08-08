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

/* -----------------------TERCERA PRUEBA-------------------------
//Inicializando ruta
const routeUser = process.argv[2];
const pathExists = (route) => fs.existsSync(route);

const mdLinks = () => {
//Verifica si existe la ruta
if(pathExists(routeUser) === false) {
  console.log(chalk.bold.red("Error: La ruta no existe"));
  return;
}

//Valida si la ruta es absoluta
if(path.isAbsolute(routeUser) === false) {
  console.log(path.resolve(routeUser));
}
console.log("La ruta ya es absoluta");
}

mdLinks()
*/

/* ----------------------SEGUNDA PRUEBA---------------------------
// Ingresamos la ruta ./README.md
const routeUser = process.argv[2];
const mdLinks = (route) => fs.existsSync(route);
// valida si existe la ruta
if (mdLinks(routeUser) === false) {
  console.log('¡Error!'); // ¿Y si no existe? muestra error
} else if (path.isAbsolute(routeUser) === false) {
  console.log(path.resolve(routeUser));
} else {
  console.log('La ruta ya era absoluta');
} */

/* ---------------------PRIMERA PRUEBA---------------------------------
export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta existe.
    if (fs.existsSync(path)) {
    //Chequear o convertir a una ruta absoluta.
    // Revisar si esa ruta absoluta es un archivo o un directorio.
    // Si es un directorio filtrar los archivos md.
    } else {
      // Si no existe la ruta se rechaza la promesa.
      reject("La ruta no existe");
    }
  });
}; */
