import React, {PropTypes} from 'react';
import Component from 'components/Component';
import ArticleInfo from 'components/ArticleInfo';
import {preload, connect} from 'utils/uitools';

@preload((store: Object): Promise<*> => {
  return store.article.loadArticles({fields: ['title', 'categories', 'overview', 'created']});
})
@connect((store: Object, params :Object): Object => {
  const articles = store.article.allArticles
  return { articles };
})
class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        {this.props.articles.map((article, i) => (
          <ArticleInfo
            key={`${article._id}-article-${i}`}
            title={article.title}
            overview={article.overview}
            id={article._id}
            created={article.created}
            categories={article.categories}
          />
        ))}
      </div>
    );
  }
}

export default ArticleList;
