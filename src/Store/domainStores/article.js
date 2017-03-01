import {observable, action} from 'mobx'

import remotedev from 'mobx-remotedev';

import createInterface from 'utils/interface'
import StorePrototype from 'utils/store';

const Interface = createInterface('articles')

class Article extends StorePrototype {
  @observable articles: Map<string, Object> = new Map();

  @action loadArticles :Function<Promise> = this.createAction('loadMore',
    (options :Object) :Promise<void> => {
      const defaultOptions = {
        errorMessage: 'Well that\'s depressing, Articles failed to fetch.',
        ...options
      }

      return Interface.getCollection(defaultOptions, (articles :Array<Object>) => {
        this.pushMoreToCollection('articles', articles, !options.fields)
      }).send();
  });

  @action loadArticle :Function<Promise> = this.createAction('load',
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
    const updatedArticle = {...article};
    if (Array.isArray(article[property])) {
      updatedArticle[property] = [value, ...updatedArticle[property]]
    } else {
      updatedArticle[property] = value;
    }
    this.articles.set(id, updatedArticle);
  }
}

export default remotedev(Article)
