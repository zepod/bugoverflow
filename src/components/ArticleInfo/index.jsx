// @flow
import React, {PropTypes} from 'react';
import Component from 'Component';
import Categories from 'ArticleCategories';
import Overview from 'ArticleOverview';
import Title from 'ArticleTitle';
import DateMark from 'DateMark';
import {Link} from 'react-router';

export default class ArticleInfo extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    created: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }

  render() {
    const {
      title,
      overview,
      categories,
      created
    } = this.props;

    return (
      <Link
        to={`article/${this.props.id}`}
      >
        <div>
          <Title title={title} />
          <DateMark date={new Date(created)} />
          <Overview overview={overview} />
          <Categories categories={categories} />
        </div>
      </Link>
    );
  }
}
