// @flow
export type CommentT = {
  _id: string,
  author: string,
  body: string,
}

export type ArticleT = {
  _id: string,
  overview: string,
  images: Array<string>,
  categories: Array<string>,
  fullyLoaded: boolean,
  title: string,
  body: string,
  comments: Array<CommentT>,
  created: string,
}

type FilterPatternT = (a: Object, i? :number) => boolean;
type SelectorPatternT = Array<string>;

export type PatternT = FilterPatternT | SelectorPatternT;
