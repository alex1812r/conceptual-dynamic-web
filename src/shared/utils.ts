export function numberWithCommas(n: number): string {
  return n.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function cleanObject(obj: { [k: string]: any }) {
  Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
  return obj;
}