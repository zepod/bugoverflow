import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Components
import MainArticleList from 'features/ArticleList'
import CategoryList from 'features/CategoryList'
import Layout from 'features/Layout'
import ArticleDetail from 'features/ArticleDetail'
import NotFound from 'NotFound'

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={MainArticleList} />
        <Route path="article/:id" component={ArticleDetail} />
        <Route path="category/:category" component={CategoryList} />
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  )
}

export default Routes
