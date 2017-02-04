import React, {Component} from 'react';

import './Layout.less';

export default class Layout extends Component {
  render() {
    return (
      <div>
        Layout
        {this.props.children}
      </div>
    )
  }
}
