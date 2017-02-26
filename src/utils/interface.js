
import config from 'config'
import Store from 'Store'
import {constructFields} from 'utils/helpers'
import Promise from 'bluebird'

export default function createInterface(domain :string) :Object {
  const cacheTracker :Array<string> = []

  function isCached(track :string) :boolean {
    return cacheTracker.indexOf(track) > -1
  }

  function getCacheTrack(request :Object) :string{
    return JSON.stringify(request) + domain
  }

  function cache(request :Object) :number{
    return cacheTracker.push(getCacheTrack(request))
  }

  function getCachingCallback(cb :Function, request :Object, cacheTracker :string) :Function {
    return (data :Object) => {
      cache(request)
      return cb(data)
    }
  }

  return {
    create: (body :Object, options? :Object, cb? :Function = () => {}) :Object => {
      const request = {
        ...options,
        subdomain: options && options.id,
        method: 'POST',
        body
      }
      const send = prepareSend(domain, request, cb)
      return { send }
    },
    update: (id :string, body :Object, options? :Object, cb? :Function = () => {}) :Object => {
      const request = {
        ...options,
        subdomain: id,
        method: 'PUT',
        body
      }
      const send = prepareSend(domain, request, cb)
      return { send }
    },
    get: (id :string, options? :Object, cb? :Function = () => {}, shouldCache? :boolean = true) :Object => {
      const request = {
        ...options,
        subdomain: id,
        method: 'GET',
        fields: options && options.fields && constructFields(options.fields)
      }
      const casheTrack = getCacheTrack(request, domain)
      if (shouldCache && isCached(casheTrack)) return { send: () => {}}
      const send = prepareSend(domain, request, getCachingCallback(cb, request, casheTrack))
      return { send }
    },
    getCollection: (options :Object = {}, cb? :Function = () => {}, shouldCache? :boolean = true) :Object => {
      const request = {
        ...options,
        method: 'GET',
        fields: options.fields && constructFields(options.fields)
      }
      const casheTrack = getCacheTrack(request, domain)
      if (shouldCache && isCached(casheTrack)) return { send: () => {}}
      const send = prepareSend(domain, request, getCachingCallback(cb, request, casheTrack))
      return { send }
    },
    remove: (id :string, options? :Object, cb? :Function = () => {}) :Object => {
      const request = {
        ...options,
        subdomain: id,
        method: 'DELETE'
      }
      const send = prepareSend(domain, request, cb)
      return { send }
    },
  }
}

function prepareSend(domain :string, request :Object, callback :Function) :Function {
  const subdomain = request.subdomain ? `/${request.subdomain}`: '';
  const fields = request.fields ? `?${request.fields}`: '';
  const url = `${config.protocol}://${config.domain}${config.port}/api/${domain}${subdomain}${fields}`
  const options = {
    method: request.method,
    body: request.body,
    headers: request.headers
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
          reject(err)
          Store.ui.throwError(request.errorMessage || 'Request failed. Naturally...')
        })
    })
  }
}
