// @flow
import React, {PropTypes} from 'react';
import Component from 'components/Component';
// import {Link} from 'react-router';

export default class ArticleBody extends Component {
  static propTypes = {
    body: PropTypes.string.isRequired
  }

  render() {
    const { body } = this.props;

    return (
        <div dangerouslySetInnerHTML={{__html: `<div>${body}</div>`}} />
    );
  }
}
