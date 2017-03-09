import React, {PropTypes} from 'react';
import Component from 'components/Component';
import ArticleInfo from 'components/ArticleInfo';
import {Link} from 'react-router';

class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        {this.props.articles.map((article, i) => (
          <Link
            key={`${article._id}-article-${i}`}
            to={`/article/${article._id}`}
          >
            <ArticleInfo
              title={article.title}
              overview={article.overview}
              id={article._id}
              created={article.created}
              categories={article.categories}
              lite={this.props.lite}
            />
          </Link>
        ))}
      </div>
    );
  }
}

export default ArticleList;
