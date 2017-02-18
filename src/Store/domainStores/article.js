// @flow
import {observable, action} from 'mobx'

import remotedev from 'mobx-remotedev';

import createInterface from 'utils/interface'
import StorePrototype from 'utils/store';

const Interface = createInterface('articles')

class Article extends StorePrototype {
  @observable articles: Map<string, Object> = new Map();

  // @computed getAllArticles = () :Array<Object> => {}
  // @computed getArticles = (ids :Array<string>) :Array<Object> => {}
  // @computed getArticle = (id :string) :Object => {}
  @action loadArticles :Function = this.createAction('loadMore',
    (options :Object) :Promise<void> => {
      const defaultOptions = {
        errorMessage: 'Well that\'s depressing, Articles failed to fetch.',
        ...options
      }

      return Interface.getCollection(defaultOptions, (articles :Array<Object>) => {
        this.pushMoreToCollection('articles', articles, !options.fields)
      }).send()
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
  })
}

export default remotedev(Article)
