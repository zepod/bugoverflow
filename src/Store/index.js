import ArticleStore from './domainStores/article'
import UIStore from './domainStores/ui'
import CommentStore from './domainStores/comment';

export const comment = new CommentStore();
export const article = new ArticleStore();
export const ui = new UIStore();

const Store = {
  article,
  ui,
  comment
}

export default Store
