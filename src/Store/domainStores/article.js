// @flow

import {observable, action} from 'mobx'

import remotedev from 'mobx-remotedev';

import createInterface from 'utils/interface'
import StorePrototype from 'utils/store';
import type {ArticleT, ID} from 'Store/types';

const Interface = createInterface('articles')

class Article extends StorePrototype {
  @observable articles: Map<ID, Object> = new Map();
  @observable searchedArticles: Array<ID> = [];




  @action searchArticles = (searchPhrase : string, field: string, options? : Object = {}) => {
    const defaultOptions = {
      errorMessage: 'Search failed. So this site really is Bug Overflow, huh?',
      search: {searchPhrase, field},
      ...options
    };

    return Interface.getCollection(defaultOptions, (articles :Array<ArticleT>) => {
      this.pushMoreToCollection('articles', articles, !options.fields);
      this.searchedArticles = articles.map(a => a._id);
    }).send();
  }

  @action loadArticles : (ops : ?Object) => Promise<*> =
    this.createAction('loadMore', (options :Object) :Promise<void> => {

      const defaultOptions = {
        errorMessage: 'Well that\'s depressing, Articles failed to fetch.',
        ...options
      };

      return Interface.getCollection(defaultOptions, (articles :Array<ArticleT>) => {
        this.pushMoreToCollection('articles', articles, !options.fields);
      }).send();
  });

  @action loadArticle : (id: ID, ops : ?Object) => Promise<*>  =
    this.createAction('load', (articleId :string, options :Object) :Promise<void> => {

      const defaultOptions = {
        errorMessage: 'This article is obviously too awesome to load itself',
        ...options
      }

      return Interface.get(articleId, defaultOptions, (article :ArticleT) =>
        this.pushToCollection('articles', article, true)).send()
  });
}

export default remotedev(Article)
