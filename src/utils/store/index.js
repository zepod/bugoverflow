// @flow
import type {PatternT} from 'Store/types';

type FakePromise = {
  then: Function
} | boolean;

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

  catchCache(id :string, collection:string) :FakePromise {
    if (
      (this: Object)[collection] &&
      (this: Object)[collection][id] &&
      (this: Object)[collection][id].fullyLoaded
    ) {
      return {then: (f :Function) => f()}
    } else return false;
  }

  getCollection(pattern? : PatternT) :Array<Object> {
    const collectionName :string = this.collection;
    const self: Object = this;
    if (!pattern) return self[collectionName].values();
    if (typeof pattern === 'function') {
      return self[collectionName].values().filter(pattern);
    }
    if (Array.isArray(pattern)) {
      return pattern.map(id => self[collectionName].get(id));
    }
    return [];
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

  update(id : string, property: string, value: any) :Object {
    const self : Object = this;
    const entity : Object = self[self.collection].get(id);
    const updatedEntity = {...entity};
    if (Array.isArray(updatedEntity[property])) {
      updatedEntity[property] = [value, ...updatedEntity[property]]
    } else {
      updatedEntity[property] = value;
    }
    return self[self.collection]
              .set(id, updatedEntity)
              .get(id);
  }
}

function pushMore(entities : Array<Object>, target: Object, markAsLoaded: boolean) {
  const [entity, ...rest] = entities;
  if (entities.length) {
    pushMore(rest, target, markAsLoaded)
  } else {
    return null;
  }
  const newentity = {...entity, fullyLoaded: markAsLoaded}
  if (!target.get(newentity._id) || !target.get(newentity._id).fullyLoaded) {
    target.set(newentity._id, newentity)
  }
}
