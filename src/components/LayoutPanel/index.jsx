import React, {PropTypes} from 'react';
import Component from 'Component';
import ArticleList from 'ArticleList';
import Search from 'Search';

class LayoutPanel extends Component {
  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  handleSearch = (searchPhrase : string) => {
    this.store.article.searchArticles(searchPhrase, 'title', {
      fields: ['title', 'overview', 'created', 'categories'],
    });
  }

  render() {
    console.log('xxxx', this.props)
    return (
      <div>
        <Search onSubmit={this.handleSearch}/>
        <ArticleList
          articles={this.props.articles}
        />
      </div>
  )
  }
}

export default LayoutPanel;
