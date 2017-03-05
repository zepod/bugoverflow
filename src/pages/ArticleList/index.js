// @flow
import React, {PropTypes} from 'react';
import Component from 'components/Component';
import ArticleList from 'components/ArticleList';
import {preload, connect} from 'utils/uitools';
import type {ArticleT} from 'Store/types';

@preload((store: Object): Promise<*> => {
  return store.article.loadArticles({fields: ['title', 'categories', 'overview', 'created']});
})
@connect((store: Object, params :Object): Object => {
  const articles : Array<ArticleT> = store.article.getCollection();
  return { articles };
})
class MainArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  }

  render() {
    const {articles} = this.props;
    return (
      <ArticleList articles={articles}/>
    );
  }
}

export default MainArticleList;
