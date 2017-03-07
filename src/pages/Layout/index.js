// @flow
import React, { PropTypes } from 'react';
import Component from 'Component';
import Header from 'LayoutHeader';
import Panel from 'LayoutPanel';
import {connect} from 'utils/uitools';
import type {ArticleT, ID} from 'Store/types';
import './Layout.less';

@connect((store: Object, params :Object): Object => {
  const searchedArticlesIds : Array<ID> = store.article.searchedArticles.toJS();
  const searchedArticles : Array<ArticleT> = store.article.getCollection(searchedArticlesIds);

  return { searchedArticles };
})
export default class Layout extends Component {
  static propTypes = {
    searchedArticles: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    return (
      <div>
        <Header />
        <Panel articles={this.props.searchedArticles} />
        {this.props.children}
      </div>
    );
  }
}
