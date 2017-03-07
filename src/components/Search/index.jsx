import React, {PropTypes} from 'react';
import Component from 'Component';

class Search extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      searchPhrase: ''
    }
  }

  handleChange = (event) => {
    this.setState({searchPhrase: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchPhrase);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.searchPhrase}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="submit"
        />
      </form>
    );
  }
}

export default Search;
