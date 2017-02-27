import React, {PropTypes} from 'react';
import Component from 'Component';
import DateMark from 'DateMark';

export default class Comment extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired
  }

  render() {
    const {
      author,
      body,
      created
    } = this.props;

    return (
        <div>
          <h3>{author}</h3>
          <p>{body}</p>
          <DateMark date={new Date(created)} />
        </div>
    );
  }
}
