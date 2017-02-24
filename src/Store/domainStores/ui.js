// @flow
import remotedev from 'mobx-remotedev'
import {observable} from 'mobx'

class UI {
  @observable errorMessage :string
  @observable errorShouldShow :boolean
  @observable preloading :boolean

  // ** Default values **

  constructor() {
    this.errorMessage = ''
    this.errorShouldShow = false
    this.preloading = false
  }

  // ** Methods **

  throwError(message :string) {
    this.errorMessage = message
    this.errorShouldShow = true
  }

  handleError() {
    this.errorShouldShow = false
  }

  startPreloading = () => {
    this.preloading = true
  }

  stopPreloading = () => {
    this.preloading = false
  }
}

export default remotedev(UI)
