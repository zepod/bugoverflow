// @flow
import {action, observable} from 'mobx'
import remotedev from 'mobx-remotedev';
import {article} from '../index';
import createInterface from 'utils/interface'
import type {CommentT} from 'Store/types';

const Interface = createInterface('comments')
class Comment {
  @observable comments = []

  @action addComment = (comment: CommentT, options :Object) :Promise<void> => {
    const wrappedOptions = {
      errorMessage: 'Comment sending was sabotaged. Fkin Klingons...',
      ...options
    }

    const articleId :string = options.id;
    article.update(articleId, 'comments', {created: Date(), ...comment});

    return Interface.create(comment, wrappedOptions).send()
  }
}

export default remotedev(Comment)
