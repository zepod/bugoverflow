// @flow
import React from 'react';
import Component from 'Component';
import Header from 'LayoutHeader';
import './Layout.less';

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
