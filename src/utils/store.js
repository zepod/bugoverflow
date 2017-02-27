// @flow
export default class StorePrototype {
  collection: string = ''

  constructor(collectionName: string) {
    this.collection = collectionName;
  }

  pushToCollection(target :string, value : Object, markAsLoaded: boolean) {
    pushMore([value], (this: Object)[target], markAsLoaded)
  }

  pushMoreToCollection(target: string, value :Array<Object>, markAsLoaded: boolean) {
    pushMore(value, (this: Object)[target], markAsLoaded)
  }

  catchCache(id :string, collection:string) {
    if ((this: Object)[collection] && (this: Object)[collection][id] && (this: Object)[collection][id].fullyLoaded) {
      return {then: (f :Function) => f()}
    }
  }

  createAction (type :string, action :Function) :Function {

    switch (type) {
      case 'load':
      return (...args) => {
        const cachedHandler = (this: Object).catchCache(args[0], this.collection);
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
  if (!target.get(newentity._id) || !target.get(newentity._id).fullyLoaded) {
    target.set(newentity._id, newentity)
  }
  if (rest.length) pushMore(rest, target, markAsLoaded)
}
