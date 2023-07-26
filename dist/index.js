"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var mdLinks = function mdLinks(path, options) {
  return new Promise(function (resolve, reject) {
    // Identifica si la ruta existe.
    if (_fs["default"].existsSync(path)) {} else {
      // Si no existe la ruta se rechaza la promesa.
      reject("La ruta no existe");
    }
  });
};
exports.mdLinks = mdLinks;
