
import config from 'config'
import Store from 'Store'
import {
  constructFields,
  constructFilter,
  constructSearch,
  fakeResolve,
} from 'utils/helpers';
import type {ID} from 'Store/types';
import Promise from 'bluebird'

export type InterfaceAPI = { send: () => Promise<*>}

type InterfaceMethod = (...parameters: any) => InterfaceAPI

type Interface = {
  create :InterfaceMethod,
  update :InterfaceMethod,
  get :InterfaceMethod,
  getCollection :InterfaceMethod,
  remove :InterfaceMethod,
}

export default function createInterface(domain :string) :Interface {
  const cacheTracker :Array<string> = []

  function isCached(track :string) :boolean {
    return cacheTracker.indexOf(track) > -1
  }

  function getCacheTrack(request :Object) :string {
    return JSON.stringify(request) + domain
  }

  function cache(request :Object) :number {
    return cacheTracker.push(getCacheTrack(request))
  }

  function getCachingCallback(cb :Function, request :Object, cacheTracker :string) :Function {
    return (data :Object) => {
      cache(request)
      return cb(data)
    }
  }

  return {
    create: (body :Object, options? :Object, cb? :Function = () => {}) :InterfaceAPI => {
      const request = {
        ...options,
        subdomain: options && options.id,
        method: 'POST',
        body
      }
      const send : () => Promise<void> = prepareSend(domain, request, cb)
      return { send }
    },
    update: (id :ID, body :Object, options? :Object, cb? :Function = () => {}) :InterfaceAPI => {
      const request = {
        method: 'PUT',
        body
      };
      const send : () => Promise<void> = prepareSend(domain, request, cb)
      return { send }
    },
    get: (id :ID, options? :Object = {}, cb? :Function = () => {}, shouldCache :boolean) :InterfaceAPI => {
      const request = {
        ...options,
        subdomain: id,
        method: 'GET',
        fields: options.fields && constructFields(options.fields)
      }
      const casheTrack : string = getCacheTrack(request, domain);
      if (shouldCache && isCached(casheTrack)) return fakeResolve(cb);
      const send : () => Promise<void> = prepareSend(domain, request, getCachingCallback(cb, request, casheTrack))
      return { send }
    },
    getCollection: (options :Object = {}, cb? :Function = () => {}, shouldCache :boolean) :InterfaceAPI => {
      const request = {
        ...options,
        fields: options.fields && constructFields(options.fields),
        filter: options.filters && constructFilter(options.filters),
        search: options.search && constructSearch(options.search.searchPhrase, options.search.field),
        method: 'GET',
      }
      const casheTrack : string = getCacheTrack(request, domain)
      if (shouldCache && isCached(casheTrack)) return fakeResolve(cb);
      const send : () => Promise<void> = prepareSend(domain, request, getCachingCallback(cb, request, casheTrack))
      return { send }
    },
    remove: (id :ID, options? :Object, cb? :Function = () => {}) :InterfaceAPI => {
      const request = {
        ...options,
        subdomain: id,
        method: 'DELETE'
      }
      const send : () => Promise<void> = prepareSend(domain, request, cb)
      return { send }
    },
  }
}

function prepareSend(domain :string, request :Object, callback :Function) : () => Promise<void> {
  const subdomain :string = request.subdomain ? `/${request.subdomain}`: '';
  const fields :string = request.fields || '';
  const filter :string = request.filter || '';
  const search :string = request.search || '';
  const url :string =  `${config.protocol}://${config.domain}${config.port}/api/${domain}${subdomain}?${fields}${filter}${search}`;

  const options = {
    method: request.method,
    body: JSON.stringify(request.body),
    headers: {
      "Content-Type": "application/json",
      ...request.headers
    }
  }
  return () :Promise<void> => {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(res => res.json())
        .then(data => {
          callback(data);
          resolve()
        })
        .catch(err => {
          reject(err);
          Store.ui.throwError(request.errorMessage || 'Request failed. Naturally...')
        })
    })
  }
}
