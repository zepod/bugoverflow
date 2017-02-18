// @flow
import React from 'react';
import Component from 'components/Component';

import './Layout.less';

export default class Layout extends Component {
  render() {
    return (
      <div>
        Layout
        {this.props.children}
      </div>
    );
  }
}
