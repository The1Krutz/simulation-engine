

export function randomColor() {
  function randomHexa() {
    const hexa = '0123456789ABCDEF';
    return hexa[Math.floor(Math.random() * hexa.length)];
  }
  return '#' + randomHexa() + randomHexa() + randomHexa() + randomHexa() + randomHexa() + randomHexa();
}