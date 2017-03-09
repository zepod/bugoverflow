// @flow
import React, {PropTypes} from 'react';
import Component from 'Component';
import Categories from 'ArticleCategories';
import Overview from 'ArticleOverview';
import Title from 'ArticleTitle';
import DateMark from 'DateMark';

export default class ArticleInfo extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    created: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    lite: PropTypes.bool
  }

  render() {
    const {
      title,
      overview,
      categories,
      created,
      lite
    } = this.props;

    return (
      <div>
        <Title title={title} />
        <DateMark date={new Date(created)} />
        {!lite && (
          <Overview overview={overview} />
        )}
        <Categories categories={categories} />
      </div>
    );
  }
}
