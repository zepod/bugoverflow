import ArticleEntity from './entities/article'
import UIEntity from './entities/ui'

const Store = {
  article: new ArticleEntity(),
  ui: new UIEntity()
}

export default Store
