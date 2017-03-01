// @flow
import React, {PropTypes} from 'react';
import Component from 'components/Component';
import ArticleList from 'components/ArticleList';
import {preload, connect} from 'utils/uitools';
import {categoryMatch} from 'utils/patterns';

@preload((store: Object, params :Object): Promise<*> => {
  return store.article.loadArticles({
    fields: ['title', 'categories', 'overview', 'created'],
    filters: [{categories: `${params.category}`}]
  });
})
@connect((store: Object, params :Object): Object => {
  const getterPattern = categoryMatch(params.category);
  const articles :Array<Object> = store.article.getCollection(getterPattern);

  return { articles };
})
class CategoryList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  }

  render() {
    const { articles } = this.props;
    return (
      <ArticleList
        articles={articles}
      />
    );
  }
}

export default CategoryList;
