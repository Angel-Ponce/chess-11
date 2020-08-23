export function onArray(array, element) {
  let valor = false;
  for (let it of array) {
    if (element == it) {
      valor = true;
    }
  }
  return valor;
}
