import React, {PropTypes} from 'react';
import Component from 'Component';
import CommentForm from 'CommentForm';
import Comment from 'Comment';

export default class CommentSection extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    addComment: PropTypes.func.isRequired
  }

  render() {
    const {
      comments
    } = this.props;
    return (
      <div>
        <h2>Comments</h2>
        <CommentForm
          onSubmit={this.props.addComment}
        />
        <ul>
          {comments.map((comment,i) => {
            return (
              <li key={`${comment._id}${i}`}>
                <Comment
                  author={comment.author}
                  body={comment.body}
                  created={comment.created}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
