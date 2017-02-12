// @flow
import config from 'config'
import Store from 'Store'

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
    create: (body :Object, cb? :Function = () => {}, errorMessage? :string) :Object => {
      const request = {
        method: 'POST',
        body,
        errorMessage
      }
      const send = prepareSend(domain, request, cb)
      return { send }
    },
    update: (id :string, body :Object, cb? :Function = () => {}, errorMessage? :string) :Object => {
      const request = {
        params: id,
        method: 'PUT',
        body,
        errorMessage
      }
      const send = prepareSend(domain, request, cb)
      return { send }
    },
    get: (id :string, cb? :Function = () => {}, errorMessage? :string, shouldCache? :boolean = true) :Object => {
      const request = {
        params: id,
        method: 'GET',
        errorMessage
      }
      const casheTrack = getCacheTrack(request, domain)
      if (shouldCache && isCached(casheTrack)) return {}
      const send = prepareSend(domain, request, getCachingCallback(cb, request, casheTrack))
      return { send }
    },
    getCollection: (options :Object = {}, cb? :Function = () => {}, errorMessage? :string, shouldCache? :boolean = true) :Object => {
      const request = {
        method: 'GET',
        errorMessage
      }
      const casheTrack = getCacheTrack(request, domain)
      if (shouldCache && isCached(casheTrack)) return {}
      const send = prepareSend(domain, request, getCachingCallback(cb, request, casheTrack))
      return { send }
    },
    remove: (id :string, cb? :Function = () => {}, errorMessage? :string) :Object => {
      const request = {
        params: id,
        method: 'DELETE',
        errorMessage
      }
      const send = prepareSend(domain, request, cb)
      return { send }
    },
  }
}

function prepareSend(domain :string, request :Object, callback :Function) :Function {
  const url = `${config.protocol}://${config.domain}${config.port}/api/${domain}/${request.params || ''}`
  const options = {
    method: request.method,
    body: request.body,
    headers: request.headers
  }
  return () => {
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        callback(data)
      })
      .catch(err => {
        Store.ui.throwError(request.errorMessage || 'Request failed. Naturally...')
      })
  }
}
