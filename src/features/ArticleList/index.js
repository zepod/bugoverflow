import React, {PropTypes} from 'react';
import Component from 'components/Component';
import ArticleOverview from 'components/ArticleOverview';
import {preload, connect} from 'utils/uitools';

@preload((store: Object): Promise<*> => {
  return store.article.loadArticles({fields: ['title', 'categories', 'overview']});
})
@connect((store: Object, params :Object): Object => {
  const articles = store.article.articles
  return {
    articles
  }
})
class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  }
  render() {
    console.log('articl', this.props.articles)
    return (
      <div>
        {this.props.articles.map(article => (
          <ArticleOverview
            title={article.title}
            overview={article.overview}
            categories={article.categories}
          />
        ))}
      </div>
    );
  }
}

export default ArticleList;
