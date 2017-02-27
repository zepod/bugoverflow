// @flow
import remotedev from 'mobx-remotedev'
import {observable} from 'mobx'

class UI {
  @observable errorMessage :string
  @observable errorShouldShow :boolean

  // ** Default values **

  constructor() {
    this.errorMessage = ''
    this.errorShouldShow = false
  }

  // ** Methods **

  throwError(message :string) {
    this.errorMessage = message
    this.errorShouldShow = true
  }

  handleError() {
    this.errorShouldShow = false
  }

}

export default remotedev(UI)
