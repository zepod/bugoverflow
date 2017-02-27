// @flow
import config from 'config'
import Store from 'Store'
import {constructFields, constructFilter} from 'utils/helpers'
import Promise from 'bluebird'
import {browserHistory} from 'react-router'

type InterfaceAPI = { send: () => Promise<*>}

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
      console.log('interface', body)
      const send : () => Promise<void> = prepareSend(domain, request, cb)
      return { send }
    },
    update: (id :string, body :Object, options? :Object, cb? :Function = () => {}) :InterfaceAPI => {
      const request = {
        method: 'PUT',
        body
      };
      const send : () => Promise<void> = prepareSend(domain, request, cb)
      return { send }
    },
    get: (id :string, options? :Object = {}, cb? :Function = () => {}, shouldCache? :boolean = true) :InterfaceAPI => {
      const request = {
        ...options,
        subdomain: id,
        method: 'GET',
        fields: options.fields && constructFields(options.fields)
      }
      const casheTrack : string = getCacheTrack(request, domain);
      if (shouldCache && isCached(casheTrack)) return { send: () => new Promise(r => r())};
      const send : () => Promise<void> = prepareSend(domain, request, getCachingCallback(cb, request, casheTrack))
      return { send }
    },
    getCollection: (options :Object = {}, cb? :Function = () => {}, shouldCache? :boolean = true) :InterfaceAPI => {
      const request = {
        ...options,
        method: 'GET',
        fields: options.fields && constructFields(options.fields),
        filter: options.filters && constructFilter(options.filters)
      }
      const casheTrack : string = getCacheTrack(request, domain)
      if (shouldCache && isCached(casheTrack)) return { send: () => new Promise(r => r())};
      const send : () => Promise<void> = prepareSend(domain, request, getCachingCallback(cb, request, casheTrack))
      return { send }
    },
    remove: (id :string, options? :Object, cb? :Function = () => {}) :InterfaceAPI => {
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
  const url :string = `${config.protocol}://${config.domain}${config.port}/api/${domain}${subdomain}?${fields}${filter}`;
  const options = {
    method: request.method,
    body: JSON.stringify(request.body),
    headers: {
      "Content-Type": "application/json",
      ...request.headers
    }
  }
  console.log('final', options)
  return () :Promise<void> => {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(res => res.json())
        .then(data => {
            callback(data);
            resolve()
        })
        .catch(err => {
          browserHistory.push('/notfound')
          reject(err)
          Store.ui.throwError(request.errorMessage || 'Request failed. Naturally...')
        })
    })
  }
}
