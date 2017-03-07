// @flow
import type {InterfaceAPI} from './interface';

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

export function constructSearch(searchPhrase : string, field: string) :string {
  const searchPhrases :Array<string> = searchPhrase.split(' ');
  return searchPhrases.reduce((query: string, phrase: string) :string =>
      `${query}&search[${field}]=${phrase}`, '');
}

export function fakeResolve(cb :Function): InterfaceAPI {
  return { send: () => new Promise(r => {cb(); return r()})};
}
