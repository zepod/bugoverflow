// @flow
export type ID = string;

export type CommentT = {
  _id: ID,
  author: string,
  body: string,
}

export type ArticleT = {
  _id: ID,
  overview: string,
  images: Array<string>,
  categories: Array<string>,
  fullyLoaded: boolean,
  title: string,
  body: string,
  comments: Array<CommentT>,
  created: string,
}

export type CollectionOf<T> = Array<T>;

export type AnyCollectionOf = CollectionOf<any>;

type FilterPatternT = (a: Object, i? :number) => boolean;
type SelectorPatternT = Array<ID>;
export type PatternT = FilterPatternT | SelectorPatternT;

export type ResponseT<T> = {
  payload: T,
  context: Object
}
