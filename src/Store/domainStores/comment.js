// @flow
import {observable, computed, action} from 'mobx'
import remotedev from 'mobx-remotedev';
import {article} from '../index';
import createInterface from 'utils/interface'


const Interface = createInterface('comments')
class Comment {
  @observable comments: Array<Object> = []

  // @computed getAllComments = () :Array<Object> => {}
  // @computed getComments = (ids :Array<string>) :Array<Object> => {}
  // @computed getComment = (id :string) :Object => {}

  @action loadComments = (options :Object) :Promise<void> => {
    const wrappedOptions = {
      errorMessage: 'Well that\'s depressing, Articles failed to fetch.',
      ...options
    }
    const self = this;
    return new Promise((resolve, reject) => {
      Interface.getCollection(wrappedOptions, (comments :Array<Object>) => {
        self.comments = comments;
      }).send(resolve, reject)
    })
  }
}

export default remotedev(Comment)
