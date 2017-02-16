// @flow
import {observable} from 'mobx'

export default class UI {
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
}
