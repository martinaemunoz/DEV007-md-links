// eslint-disable-next-line import/extensions
import mdLinks from '../src/index.js';

describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
  /* it("Debería devolver una promesa", () => {
    expect(mdLinks()).toBe(typeof Promise);
  }); */
  it('Debe rechazar la promesa cuando el path no existe', () => {
    expect(mdLinks('/marti/noexiste.md').rejects(new Error('Invalid Path')));
    /* expect(error).toBe('La ruta no existe'); */
  });
});
