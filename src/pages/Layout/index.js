import React, { PropTypes } from 'react';
import Component from 'Component';
import Header from 'LayoutHeader';
import Panel from 'LayoutPanel';
import ErrorDisplay from 'ErrorDisplay';
import {connect} from 'utils/uitools';
import type {ArticleT, ID, CollectionOf} from 'Store/types';
import './Layout.less';

type State = {
  noResult: boolean
};

@connect((store: Object, params :Object): Object => {
  const searchedArticlesIds : Array<ID> = store.article.searchedArticles.toJS();
  const searchedArticles : CollectionOf<ArticleT> = store.article.getCollection(searchedArticlesIds);
  const errorShouldShow : boolean = store.ui.errorShouldShow;
  return { searchedArticles, errorShouldShow };
})
export default class Layout extends Component<State> {
  static propTypes = {
    searchedArticles: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props : Object, context: Object) {
    super(props, context);
    this.state = {
      noResult: true
    }
  }

  handleSearch = (searchPhrase : string) => {
    if (!searchPhrase) {

      this.setState({noResult: true});
    } else {

      this.setState({noResult: false});
      this.store.article.searchArticles(searchPhrase, 'title', {
        fields: ['title', 'overview', 'created', 'categories'],
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.errorShouldShow && (
          <ErrorDisplay />
        )}
        <Header />
        <Panel
          noResult={this.state.noResult}
          onSearch={this.handleSearch}
          articles={this.props.searchedArticles}
        />
        {this.props.children}
      </div>
    );
  }
}
