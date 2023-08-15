import path from 'path';
import fs from 'fs';
// eslint-disable-next-line no-unused-vars, import/no-extraneous-dependencies
import axios from 'axios';
import {
  pathExists,
  toAbsolutePath,
  isFile,
  isDirectory,
  extName,
  mdLinksRecursive,
  validateRes,
  computeRes,
  readMdFile,
// eslint-disable-next-line import/extensions
} from '../src/functions.js';

describe('pathExists', () => {
  it('It is a function', () => {
    expect(typeof pathExists).toBe('function');
  });
  it('Returns true if the path exists', () => {
    expect(pathExists('./README.md')).toEqual(true);
  });
});

describe('toAbsolutePath', () => {
  it('It is a function', () => {
    expect(typeof toAbsolutePath).toBe('function');
  });
  it('Returns true if the path is absolute', () => {
    expect(toAbsolutePath('/DEV007-md-links/README.md')).toEqual(true);
  });
  it('Returns false if the path is relative', () => {
    expect(toAbsolutePath('./README.md')).toEqual(false);
  });
});

describe('isFile', () => {
  it('It is a function', () => {
    expect(typeof isFile).toBe('function');
  });
});

describe('isDirectory', () => {
  it('It is a function', () => {
    expect(typeof isDirectory).toBe('function');
  });
  it('Returns true if the path is a directory', () => {
    expect(isDirectory('./.')).toEqual(true);
  });
});

describe('extName', () => {
  it('It is a function', () => {
    expect(typeof extName).toBe('function');
  });
  it('Returns the .md extension of an md file', () => {
    expect(extName('/DEV007-md-links/README.md')).toEqual('.md');
  });
  it('Returns the .js extension of a js file', () => {
    expect(extName('./cli.js')).toEqual('.js');
  });
});

describe('mdLinksRecursive', () => {
  // Mocks the behavior of readdirSync to return specific filenames
  jest.spyOn(fs, 'readdirSync').mockImplementation((dir) => {
    if (dir === 'tempDir') {
      return ['file1.md', 'file2.js', 'subdir'];
    }
    if (dir === 'tempDir\\subdir') {
      return ['file3.md', 'file4.txt'];
    }
    return [];
  });

  // Mocks the behavior of statSync to return different boolean values
  // based on the filename (whether it's an .md file or a directory)
  jest.spyOn(fs, 'statSync').mockImplementation((file) => {
    // Returns the last portion of the path
    const baseName = path.basename(file);
    if (baseName === 'file1.md' || baseName === 'file3.md') {
      return { isFile: () => true };
    }
    return { isFile: () => false, isDirectory: () => true };
  });

  // eslint-disable-next-line max-len
  it('Returns an array with all .md files in the directory and its subdirectories', () => {
    // Checks whether the mdLinksRecursive function correctly finds .md files in a directory and its subdirectories.
    const result = mdLinksRecursive('tempDir');
    expect(result).toEqual([
      'tempDir\\file1.md',
      'tempDir\\subdir\\file3.md',
    ]);
  });
    // Checks whether the mdLinksRecursive function handles the case of an empty directory correctly.
  it('Returns an empty array for an empty directory', () => {
    const result = mdLinksRecursive('empty');
    expect(result).toEqual([]);
  });
});

// Mock for the axios library
jest.mock('axios');

describe('validateRes', () => {
  it('Resolves with updated link object for a successful request', async () => {
    const link = { href: 'http://example.com' };
    const response = { status: 200, statusText: 'OK' };
    
    axios.get.mockResolvedValue({ data: {}, ...response });

    const result = await validateRes(link);

    //Expects an object that combines the original link properties with the status and statusText from the mock response.
    expect(result).toEqual({ ...link, status: response.status, statusText: response.statusText });
  });
});

describe('computeRes', () => {
  it('Calculates stats correctly for a set of links', () => {
    const links = [
      { href: 'https://www.google.com', status: 200 },
      { href: 'https://www.example.com', status: 200 },
      { href: 'https://www.example.com', status: 404 },
      { href: 'https://www.invalidlink.com', status: 500 },
    ];

    const stats = computeRes(links);
    expect(stats.uniqueLinksArray).toEqual([
      'https://www.google.com',
      'https://www.example.com',
      'https://www.invalidlink.com',
    ]);
    expect(stats.totalLinks).toBe(4);
    expect(stats.uniqueLinks).toBe(3);
    expect(stats.brokenLinks).toBe(2);
  });

  it('Returns zero stats for an empty array of links', () => {
    const links = [];
    const stats = computeRes(links);
    expect(stats.uniqueLinksArray).toEqual([]);
    expect(stats.totalLinks).toBe(0);
    expect(stats.uniqueLinks).toBe(0);
    expect(stats.brokenLinks).toBe(0);
  });
});

describe('readMdFile', () => {
  it('Handles no links in the Markdown file', () => {
    const filePath = path.join(__dirname, 'empty.md');
    const content = 'This is a test file without links.';
    require('fs').writeFileSync(filePath, content);

    const result = readMdFile(filePath);
    expect(result).toEqual([]);
  });
});

