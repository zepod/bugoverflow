// @flow
import React, {PropTypes} from 'react';
import Component from 'components/Component';
import ArticleInfo from 'components/ArticleInfo';
import ArticleBody from 'components/ArticleBody';
// import CommentSection from 'components/CommentSection';
// import {Link} from 'react-router';

export default class ArticleDetail extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired
  }

  render() {
    const {
      article
    } = this.props;
    console.log('article', article)
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
