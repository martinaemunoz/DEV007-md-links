import fs from 'fs';
import path from 'path';
import { pathExists, toAbsolutePath, isFile, isDirectory, mdLinksRecursive, readMdFile, extName } from './functions.js';


export const mdLinks = (pathUser, options) => {
  return new Promise((resolve, reject) => {
    /*const absolute = toAbsolutePath(path)
    console.log(absolute)*/
    if (!pathExists(pathUser)) {
      reject(new Error ("Invalid Path"));
    }
    if (!toAbsolutePath(pathUser)){
      resolve(`The absolute path is: ${path.resolve(pathUser)}`);
    }
    if (isDirectory(pathUser)){
      const mdFiles = mdLinksRecursive(pathUser);
      const promise = mdFiles.map((file) => mdLinks(file));

      Promise.all(promise)
      .then((results) => results.flat())
      .then((links) => {
        resolve(links.filter((link) => link.href));
      })
      .catch((error) => reject(error));
    } else if (isFile(pathUser).isFile() && extName(pathUser) === '.md') {
      const links = readMdFile(pathUser).map((link) => ({
        href: link.url,
        text: link.text,
        file: path.resolve(pathUser),
      }));
  
      if (links.length === 0) {
        resolve('Empty .md file found');
      } else {
        resolve(links);
      }
  } else {
    reject(new Error('The file does not have a .md extension or is not a directory'));
  }
    /*if (isDirectory(pathUser))
    {
    if (!isFile(pathUser)){
        reject(new Error ("File is not .md"))
    }
    }*/
  });
}

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
