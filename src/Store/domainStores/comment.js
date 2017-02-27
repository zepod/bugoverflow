// @flow
import {action, observable} from 'mobx'
import remotedev from 'mobx-remotedev';
import {article} from '../index';
import createInterface from 'utils/interface'

type CommentType = {author: string, body: string};

const Interface = createInterface('comments')
class Comment {
  @observable comments = []

  @action addComment = (comment: CommentType, options :Object) :Promise<void> => {
    console.log('in action', comment)
    const wrappedOptions = {
      errorMessage: 'Comment sending was sabotaged. Fkin Klingons...',
      ...options
    }
    const articleId :string = options.id;
    return Interface.create(comment, wrappedOptions, (response) => {
      article.updateArticle(articleId, 'comments', response.comment)
    }).send()
  }
}

export default remotedev(Comment)
