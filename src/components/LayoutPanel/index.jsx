import React, {PropTypes} from 'react';
import Component from 'Component';
import ArticleList from 'ArticleList';
import Search from 'Search';

class LayoutPanel extends Component {
  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    return (
      <div>
        <Search onSubmit={this.props.onSearch}/>
        {this.props.noResult
          ? <div>No Articles Found</div>
          : (
            <ArticleList
              articles={this.props.articles}
              lite
            />
        )}
      </div>
  )
  }
}

export default LayoutPanel;
