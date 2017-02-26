// @flow
import React, {PropTypes} from 'react';
import Component from 'Component';
import Detail from 'ArticleDetail';
import {preload, connect} from 'utils/uitools';
import {Link} from 'react-router'

@preload((store: Object, params: Object): Promise<*> => {
  return store.article.loadArticle(params.id).then(() => console.log('xxx'))
})
@connect((store: Object, params :Object): Object => {
  const article = store.article.articles.get(params.id)
  return { article }
})
class ArticleDetail extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired
  }
  componentWillMount() {
    const store :Object = this.store
    store.ui.setPreloading(true)
  }
  render() {
    console.log('article', this.props.article)
    const {
      article
    } = this.props
    return (
      <div>
        {/* <Detail
          article={article}
        /> */}
        <Link to="/">
        hej dejv
      </Link>
      </div>
    );
  }
}

export default ArticleDetail;
