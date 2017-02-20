import React from 'react';
import { observer } from 'mobx-react';
import Component from 'components/Component';

export default class Panel extends Component {
  constructor() {
    super();
    this.state = {
      shownArticles: [],
    };
  }

  refreshShownArticles = shownArticles => {
    const allArticles = this.store.article.articles;
    if (allArticles.length <= 3) return allArticles;
    const otherArticles = allArticles.filter(article => shownArticles.indexOf(article._id) > -1);
    if (otherArticles.length < 3) return;
  };
  // componentDidMount() {
  //     setInterval(() => {
  //
  //       this.setState({shownArticles: []})
  //     }, 20000)
  // }
  //
  render() {
    return (
      <div>
        <Header />
        <Articles articles={this.state.articles} />
      </div>
    );
  }
}
