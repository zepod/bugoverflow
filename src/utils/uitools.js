import React, {Component} from 'react';
import Store from 'Store';
import Preloader from 'components/Preloader';
import { observer } from 'mobx-react';

type preloadState = {
  isPreloading: boolean
}

export function preload(loadingFunc :Function) :Function {
  return (DecoratedComponent :Class<*>) => {
    class PreloadHOC extends Component {
      constructor(props :Object) {
        super(props);
        const state : preloadState = {
          isPreloading: true
        }
        this.state = state;
        loadingFunc(Store, this.props.params).then(() => this.setState({isPreloading: false}));
      }

      componentWillReceiveProps(nextProps) {
        const nextParams :Array<string> = Object.keys(nextProps.params)
                  .map((key: string) :string => nextProps.params[key])
        const params :Array<string> = Object.keys(this.props.params)
                  .map((key: string) :string => this.props.params[key])
        const paramsChanged : boolean = nextParams.reduce((changed, param) => {
          return nextParams.length !== params.length || changed || params.indexOf(param) === -1;
        }, false);

        if (paramsChanged) {
          this.setState({isPreloading: true});
          loadingFunc(Store, nextProps.params).then(() => this.setState({isPreloading: false}));
        }
      }

      render() {
        const state: preloadState = this.state;
        if (state.isPreloading) {
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
      render = () => (
        <DecoratedComponent
          {...this.props}
          {...getData(Store, this.props.params)}
        />
      );
    }
    return ConnectHOC;
  };
}
