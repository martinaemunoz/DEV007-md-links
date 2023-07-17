import fs from 'fs';

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta existe.
    if (fs.existsSync(path)) {

    } else {
      // Si no existe la ruta se rechaza la promesa.
      reject("La ruta no existe");
    }
  });
};