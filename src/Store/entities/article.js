import {observable} from 'mobx'
import remotedev from 'mobx-remotedev';
import createInterface from 'utils/interface'


const Interface = createInterface('articles')
class Article {
  @observable articles: Array

  constructor() {
    this.articles = [{}]
  }

  loadArticles() {
    const self = this;
    Interface.getCollection({}, (articles) => {
      console.log('got the shit', articles)
      self.articles = articles
    }).send()
  }
}

export default remotedev(Article)
