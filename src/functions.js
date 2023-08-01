import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Confirming the path's existence
export const pathExists = (route) => fs.existsSync(route);

// Verifying if the path is absolute.
// If not, it converts the relative path into absolute.
export const toAbsolutePath = (route) => path.isAbsolute(route);

// Checking if a given input path is a file
export const isFile = (route) => fs.statSync(route);

// Checking if a given input path is a directory
export const isDirectory = (route) => fs.statSync(route).isDirectory();

// Checking if the file has an .md extension
export const extName = (route) => path.extname(route);

// Extracts links within the .md file
export const readMdFile = (route) => {
  const file = fs.readFileSync(route, 'utf-8');
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/gm;
  const matches = Array.from(file.matchAll(regex));
  const links = matches.map((match) => ({
    text: match[1],
    url: match[2],
    file: path.resolve(route),
  }));

  return links;
};

// Obtains all .md files either from a directory or a subdirectory
export const mdLinksRecursive = (dir) => {
  let mdFiles = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile() && path.extname(filePath) === '.md') {
      mdFiles.push(filePath);
    } else if (stats.isDirectory()) {
      const subMdFiles = mdLinksRecursive(filePath);
      mdFiles = mdFiles.concat(subMdFiles);
    }
  });

  return mdFiles;
};

export const validateRes = (link) => new Promise ((resolve) => {
    const validatedRes = { ...link };
    axios.get(link.href)
    .then((response) => {
        validatedRes.status = response.status;
        validatedRes.statusText = response.statusText;

        resolve(validatedRes);
    })
    .catch(() => {
        validatedRes.status = 404;
        validatedRes.statusText = 'Not Found';

        resolve(validatedRes);
    });
});


export const computeRes = (links) => {
    const uniqueLinksSet = new Set(links.map((link) => link.href));
    const totalLinks = links.length;
    const uniqueLinks = uniqueLinksSet.size;
    const brokenLinks = links.filter((link) => link.status >= 400).length;
    return {
        totalLinks,
        uniqueLinks,
        brokenLinks,
        uniqueLinksArray: Array.from(uniqueLinksSet),
    };
};

