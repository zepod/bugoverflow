// @flow
import React, {Component} from 'react';
// import Component from 'components/Component';
import Store from 'Store';
import Preloader from 'components/Preloader';
import { observer } from 'mobx-react';

export function preload(loadingFunc :Function) {
  Store.ui.startPreloading()
  return (DecoratedComponent :Class<*>) => {
    @observer
    class PreloadHOC extends Component {
      render() {
        if (Store.ui.preloading) {
          loadingFunc(Store, this.props.params)
          Store.ui.stopPreloading()
          return (<Preloader />)
        } else {
          return (<DecoratedComponent {...this.props}/>)
        }
      }
    }
    return PreloadHOC;
  }
}

export function connect(getData: Function) {
  return (DecoratedComponent: Class<*>) => {
    @observer
    class ConnectHOC extends Component {
      render() {
        return <DecoratedComponent {...this.props} {...getData(Store, this.props.params)} />;
      }
    }
    return ConnectHOC;
  };
}
