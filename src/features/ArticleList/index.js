import React from 'react'
import Component from 'components/Component'

export default class ArticleList extends Component {
  componentDidMount() {
    console.log('didmount')
    this.store.article.loadArticles()
  }
  render() {
    console.log('is it',this.store)
    return (
      <div>
        ArticleList
      </div>
    )
  }
}
