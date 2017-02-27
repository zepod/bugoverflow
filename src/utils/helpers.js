// @flow
export function constructFields(fields :Array<string>) :string {
  return `&fields=${fields.join('%20')}`
}

export function constructFilter(filters :Array<Object>) :string {
  const [filter, ...rest] = filters;
  const property = Object.keys(filter)[0];
  let query = `&filter[${property}][$eq]=${filter[property]}`;
  if (rest.length) query += constructFilter(rest);
  return query;
}
