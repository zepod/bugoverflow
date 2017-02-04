import React, {PropTypes} from 'react';
// import shallowEqual from 'react-pure-render/shallowEqual';
// import shallowCompare from 'react-addons-shallow-compare';
import shallowEqual from 'utils/shallowEqual';
import Store from 'Store';
/**
 * Purified React.Component. Goodness.
 * http://facebook.github.io/react/docs/advanced-performance.html
 */
export default class Component extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = Store;
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

}
