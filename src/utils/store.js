
export default class StorePrototype {

  pushToCollection(target :string, value : Object, markAsLoaded: boolean) {
    pushMore([value], this[target], markAsLoaded)
  }

  pushMoreToCollection(target: string, value :Array<Object>, markAsLoaded: boolean) {
    pushMore(value, this[target], markAsLoaded)
  }

  catchCache(id :string, collection:string) {
    if (this[collection] && this[collection][id] && this[collection][id].fullyLoaded) {
      return {then: (f :Function) => f()}
    }
  }
}

function pushMore(entities : Array<Object>, target: Object, markAsLoaded: boolean) {
  const [entity, ...rest] = entities;
  const newentity = {...entity, fullyLoaded: markAsLoaded}
  target.set(entity._id, newentity)
  if (rest.length) pushMore(rest, target, markAsLoaded)
}
