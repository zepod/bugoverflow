
import React from 'react'
import Component from 'components/Component';
import Store from 'Store';
import Preloader from 'components/Preloader'
import {observer} from 'mobx-react'

export function preload(loadingFunc :Function) {
  Store.ui.startPreloading()
  loadingFunc(Store).then(() => Store.ui.stopPreloading());
  return (DecoratedComponent :Class<Component>) => {
    @observer
    class PreloadHOC extends Component {
      render() {
        if (Store.ui.preloading) {
          return <Preloader />
        } else {
          return <DecoratedComponent {...this.props}/>
        }
      }
    }
    return PreloadHOC;
  }
}
