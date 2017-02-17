
export default class StorePrototype {

  constructor(collectionName: string) {
    this.collection = collectionName;
  }

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

  createAction (type :string, action :Function) :Function {
    const self = this;
    switch (type) {
      case 'load':
      return (...args) => {
        const cachedHandler = self.catchCache(args[0], self.collection);
        if (cachedHandler) return cachedHandler();
        return action(...args)
      }
      case 'loadMore':
        return (...args) => action(...args)
      default:
        throw new Error('Action Creator doesn\'t recognized provided type ', type)
    }
  }


}

function pushMore(entities : Array<Object>, target: Object, markAsLoaded: boolean) {
  const [entity, ...rest] = entities;
  const newentity = {...entity, fullyLoaded: markAsLoaded}
  target.set(entity._id, newentity)
  if (rest.length) pushMore(rest, target, markAsLoaded)
}
