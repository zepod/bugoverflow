import React from 'react';
import Component from 'Component';

class ErrorDisplay extends Component {
  componentDidMount () {
    setTimeout(() => this.store.ui.handleError(), 5000);
  }

  render() {
    return (
      <div>
        {this.store.ui.errorMessage}
      </div>
    )
  }
}

export default ErrorDisplay;
