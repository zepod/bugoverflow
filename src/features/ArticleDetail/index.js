import React from 'react'
import Component from 'components/Component'

export default class ArticleDetail extends Component {
  componentDidMount(){
    this.store.article.loadArticle(this.props.params.id)
  }
  render() {
    return (
      <div>
        ArticleDetail
      </div>
    )
  }
}
