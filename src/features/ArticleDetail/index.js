// @flow
import React, {PropTypes} from 'react';
import Component from 'components/Component';
import {preload, connect} from 'utils/uitools';

@preload((store: Object, params: Object): Promise<*> => {
  return store.article.loadArticle(params.id)
})
@connect((store: Object, params :Object): Object => {
  const article = store.article.articles.get(params.id)
  return {
    article
  }
})
export default class ArticleDetail extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired
  }
  render() {
    console.log('article', this.props.article)
    return (
      <div>
        ArticleDetail
      </div>
    );
  }
}
