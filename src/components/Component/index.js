// @flow
import React, { PropTypes } from 'react';
import Store from 'Store';


export default class Component<State> extends React.Component {
  store :Object = {};
  state: State | any;
  constructor(props: Object, context: Object) {
    super(props, context);
    this.store = Store;
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  };

}
