# Markdown Links

## Index

* [1. About the Library](#1-about-the-library)
* [2. Summary](#2-summary)
* [3. Flowchart](#3-flowchart)
* [4. User guide](#4-user-guide)
* [5. Output showcase](#5-output-showcase)
* [6. Unit Testing](#6-unit-testing)
* [7. Checklist](#7-checklist)

***

## 1. About the Library
Markdown stands out as a lightweight markup language highly favored within the developer community. It finds widespread use across various platforms that handle plain text, including GitHub, forums, and blogs. This format has become a staple in repositories, with the quintessential README.md file often starting the collection.
In the realm of these Markdown files, hyperlinks play a crucial role. However, these links frequently encounter issues, ranging from being broken to no longer functioning. This situation significantly diminishes the value of the shared information.

In response to this challenge within the open-source community, a proposal emerged to develop a Node.js tool. This tool aims to read and interpret Markdown-formatted files, systematically verifying the links they contain and generating informative statistics.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## 2. Summary

This project is a command-line tool (CLI) as well as a .js library that runs using Node.js.

Node.js serves as a runtime environment for JavaScript, leveraging the power of Chrome's V8 JavaScript engine. This unique foundation empowers us to execute JavaScript code directly within the operating system's context, whether on a personal computer or a server. This flexibility unlocks a realm of possibilities, enabling seamless interaction with system resources, files, networks, and more.

Both the library and its accompanying CLI rely on external dependencies, including modules like 'path', 'FS', 'Axios' for HTTP client functionality, and 'Chalk' for terminal string styling. These components were crafted using JavaScript, specifically designed to operate seamlessly within the Node.js environment. The development and testing phases were facilitated by tools such as Babel, Eslint, and Jest.

## 3. Flowchart

Flowchart that was used for project development.

<br><br><img src="/img/md-links.drawio.png" style= width:80%>

## 4. User guide

### 1) As a JavaScript API

#### Installation
In order to use the library as an API, follow these steps:

1. Fork the [GitHub Repository](https://github.com/martinaemunoz/DEV007-md-links).
2. Open your terminal and use the cd command to go to the folder where you want 
to save the project.
3. Run the following command:
   
     ```sh
     git clone https://github.com/martinaemunoz/DEV007-md-links.git
     ```
   
5. Open the folder you chose on your code editor software.
6. Open the terminal and you can start using the API.
   
#### How to use

Run the following command in your terminal:

     node cli.js <path> [options]
      
The 'path' parameter represents the location of the file or directory, and it can be specified as either an absolute or relative path. Additionally, you have the option to include supplementary actions through the 'options' parameter. It's important to note that specifying options is not obligatory, and the application will function properly even if only the path is given. Possible options include '--validate' (or '--v'), '--stats' (or '--s'), or a combination of both.

### 2) As a CLI (Command Line Interface)

## 5. Output showcase
#### Retrieves links without options: <br><br><img src="https://github.com/martinaemunoz/DEV007-md-links/blob/develop/img/no-options.png" style= width:80%>

#### Validates links: <br><br><img src="/img/validate.png" style= width:80%>

#### Shows stats: <br><br><img src="/img/stats.png" style= width:80%>

#### Shows validation and stats: <br><br><img src="/img/validate-stats.png" style= width:80%>

#### Shows error if path is invalid: <br><br><img src="/img/invalid-path.png" style= width:80%>

#### Shows error if no links were found: <br><br><img src="/img/no-links-found.png" style= width:80%>

## 6. Unit testing
Tests cover 89.36% of statements, 83.33% of branches, 81.25% of functions and 92.1% of lines. Jest was employed for conducting the tests. For more information on the results you can check the image below:
<br><br><img src="/img/unit-testing.png" style= width:80%>

## 7. Checklist

### General
* [x] Can be installed with `npm install --global <github-user>/md-links`

### `README.md`
* [x] Backlog board for the implementation.
* [x] Technical documentation.
* [x] Installation and usage guide.

### API `mdLinks(path, opts)`
* [x] The module exports a function with the expected API.
* [x] Individual file support implementation
* [x] Folder support implementation
* [x] Implementation of `options.validate`

### CLI
* [x] Displays excutable `md-links` in the path (added 
in `package.json`)
* [x] It runs without errors / with the expected output 
* [x] Implementation of `--validate`
* [x] Implementation of `--stats`

### Tests
* [x] Unit test coverage of at least 70% of statements, functions, 
lines and branches.
* [x] Tests passed (including linters) (`npm test`).
