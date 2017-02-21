// @flow
import {action, observable} from 'mobx'
import remotedev from 'mobx-remotedev';
import {article} from '../index';
import createInterface from 'utils/interface'


const Interface = createInterface('comments')
class Comment {
  @observable comments = []

  @action addComments = (comment: Object, options :Object) :Promise<void> => {
    const wrappedOptions = {
      errorMessage: 'Comment sending was sabotaged. Fkin Klingons...',
      ...options
    }
    const articleId = options.id;
    return new Promise((resolve, reject) => {
      Interface.create(comment, wrappedOptions, (response) => {
        article.updateArticle(articleId, 'comments', response.comment)
      }).send(resolve, reject)
    })
  }
}

export default remotedev(Comment)
