import fs from 'fs';
import path from 'path';

// Confirming the path's existence
export const pathExists = (route) => {
    return fs.existsSync(route)
}

// Verifying if the path is absolute, if not, it converts the relative path into absolute
export const toAbsolutePath = (route) => {
    return path.isAbsolute(route);
}

// Checking if a given input path is a file
export const isFile = (route) => {
    return fs.statSync(route);
}

// Checking if a given input path is a directory
export const isDirectory = (route) => {
    return fs.statSync(route).isDirectory();
}

// Checking if the file has a .md extension
export const extName = (route) => {
    return path.extname(route);
}

// Extracts links within the .md file
export const readMdFile = (route) => {
    const file = fs.readFileSync(route, 'utf-8');
    const regex = /\[([^\]]+)\]\((.*)\)/gm;
    const matches = Array.from(file.matchAll(regex));
    const links = matches.map((match) => ({
        text: match[1],
        url: match[2],
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

    if (stats.isFile() && path.extname(filePath) === '.md'){
        mdFiles.push(filePath);
    } else if (stats.isDirectory()) {
        const subMdFiles = mdLinksRecursive(filePath);
        mdFiles = mdFiles.concat(subMdFiles);
    }
});

return mdFiles;
};

