import React from 'react';
import Component from 'components/Component';

export default class ArticleList extends Component {
  componentDidMount() {
    this.store.article.loadArticles({
      fields: ['title']
    });
    setTimeout(() => this.store.article.loadArticle('58990bc8734d1d4347585460'), 10000)
  }
  render() {
    return (
      <div>
        ArticleList
      </div>
    );
  }
}
