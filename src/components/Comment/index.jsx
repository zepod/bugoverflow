import React, {PropTypes} from 'react';
import Component from 'components/Component';
import ArticleInfo from 'components/ArticleInfo';
import ArticleBody from 'components/ArticleBody';
import CommentSection from 'components/CommentSection';
// import {Link} from 'react-router';

export default class ArticleDetail extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired
  }

  render() {
    const {
      article
    } = this.props;

    return (
        <div>
          <ArticleInfo />
          <ArticleBody />
          <CommentSection />
        </div>
    );
  }
}
