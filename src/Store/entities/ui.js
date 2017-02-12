// @flow
import {observable} from 'mobx'

export default class UI {
  @observable errorMessage :string
  @observable errorShouldShow :boolean

  // ** Default values **

  constructor() {
    this.errorMessage = ''
    this.errorShouldShow =  false
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
