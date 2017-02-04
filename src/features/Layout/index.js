import React, {Component} from 'react';

import './Layout.less';

export default class Layout extends Component {
  componentDidMount() {
    fetch('http://localhost:8080/api/').then(r => r.json()).then(d => {console.log(d)});
  }
  render() {
    return (
      <div>
        Layout
        {this.props.children}
      </div>
    )
  }
}
