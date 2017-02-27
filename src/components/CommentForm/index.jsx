import React, {PropTypes} from 'react';
import Component from 'Component';

export default class CommentSection extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      fields: {
        author: '',
        body: ''
      }
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.context.router.params.id, this.state.fields)
    this.setState({
      fields: {
        author: '',
        body: ''
      }
    })
  }

  handleBodyChange = (event) => {
    this.setState({
      fields: {
        ...this.state.fields,
        body: event.target.value,
      },
    });
  }
  handleAuthorChange = (event) => {
    this.setState({
      fields: {
        ...this.state.fields,
        author: event.target.value,
      },
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Your name:
        <input
          type="text"
          value={this.state.fields.author}
          onChange={this.handleAuthorChange}
        />
        Your message:
        <textarea
          type="text"
          value={this.state.fields.body}
          onChange={this.handleBodyChange}
        />
        <input type="submit" value="Dispatch!"/>
      </form>
    );
  }
}
