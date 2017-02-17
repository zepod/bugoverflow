import React from 'react';
import Component from 'components/Component';
import {preload} from 'utils/uitools';

@preload((store: Object): Promise<*> => {
  return store.article.loadArticles({fields: ['title']});
})
class ArticleList extends Component {
  render() {
    return (
      <div>
        ArticleList
      </div>
    );
  }
}

export default ArticleList
