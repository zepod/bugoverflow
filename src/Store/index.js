// @flow
import ArticleStore from './domainStores/article'
import UIStore from './domainStores/ui'
import CommentStore from './domainStores/comment';

export const comment = new CommentStore('comments');
export const article = new ArticleStore('articles');
export const ui = new UIStore();

const Store = {
  article,
  ui,
  comment
}

export default Store
