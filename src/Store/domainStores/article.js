import {observable, action, computed} from 'mobx'

import remotedev from 'mobx-remotedev';

import createInterface from 'utils/interface'
import StorePrototype from 'utils/store';

const Interface = createInterface('articles')

class Article extends StorePrototype {
  @observable articles: Map<string, Object> = new Map();

  @computed get allArticles() :Array<Object> {
    return this.articles.values();
  }

  @action loadArticles :Function = this.createAction('loadMore',
    (options :Object) :Promise<void> => {
      const defaultOptions = {
        errorMessage: 'Well that\'s depressing, Articles failed to fetch.',
        ...options
      }

      return Interface.getCollection(defaultOptions, (articles :Array<Object>) => {
        this.pushMoreToCollection('articles', articles, !options.fields)
      }).send();
  });

  @action loadArticle :Function = this.createAction('load',
    (articleId :string, options :Object) :Promise<void> => {
      const defaultOptions = {
        errorMessage: 'This article is obviously too awesome to load itself',
        ...options
      }

      return Interface.get(articleId, defaultOptions, (article) => {

        this.pushToCollection('articles', article, true)
      }).send()
  });

  @action updateArticle: Function = (id :string, property :string, value :Object) :void => {
    const article : Object = this.articles.get(id);
    if (Array.isArray(article[property])) {
      article[property].push(value);
    } else {
      article[property] = value;
    }
  }
}

export default remotedev(Article)
