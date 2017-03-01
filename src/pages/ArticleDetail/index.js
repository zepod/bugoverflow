// @flow
import React, {PropTypes} from 'react';
import Component from 'Component';
import ArticleInfo from 'components/ArticleInfo';
import ArticleBody from 'components/ArticleBody';
import {preload, connect} from 'utils/uitools';
import CommentSection from 'CommentSection';

type Comment = {author: string, body: string};

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

  handleAddComment = (articleId :string, comment: Comment) => {
    const store : Object = this.store;
    store.comment.addComment(comment, {id: articleId})
  }

  render() {
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
        <CommentSection
          comments={article.comments}
          addComment={this.handleAddComment}
        />
      </div>
    );
  }
}

export default ArticleDetail;
