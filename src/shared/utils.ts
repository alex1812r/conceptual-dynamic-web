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

export const getPaginateParamsByPage = (
  page?: number,
  perPage?: number,
): { skip: number | undefined; take: number | undefined } => {
  const skip = 
    typeof page === 'number' && typeof perPage === 'number' 
    ? (page - 1) * perPage : undefined; 
  return { skip, take: perPage };
};
