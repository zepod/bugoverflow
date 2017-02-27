// @flow
import React, {PropTypes} from 'react';
import Component from 'Component';
import ArticleInfo from 'components/ArticleInfo';
import ArticleBody from 'components/ArticleBody';
import {preload, connect} from 'utils/uitools';

@preload((store: Object, params: Object): Promise<*> => {
  return store.article.loadArticle(params.id)
})
@connect((store: Object, params :Object): Object => {
  const article = store.article.articles.get(params.id)
  return { article }
})
class ArticleDetail extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired
  }

  render() {
    console.log('article', this.props.article)
    const {
      article
    } = this.props
    return (
      <div>
        <ArticleInfo
          title={article.title}
          overview={article.overview}
          categories={article.categories}
          created={article.created}
          id={article._id}
        />
        <ArticleBody
          body={article.body}
        />
        {/* <CommentSection /> */}
      </div>
    );
  }
}

export default ArticleDetail;
