// @flow
import React, { PropTypes } from 'react';
// import shallowEqual from 'react-pure-render/shallowEqual'
// import shallowCompare from 'react-addons-shallow-compare'
import shallowEqual from 'utils/shallowEqual';
import Store from 'Store';

type State = *;

export default class Component<T> extends React.Component {
  store = {};
  constructor(props: Object, context: Object) {
    super(props, context);
    this.store = Store;
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  };

  shouldComponentUpdate(nextProps: Object, nextState: State) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }
}
