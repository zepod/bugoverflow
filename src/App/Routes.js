import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Components
import MainArticleList from 'pages/ArticleList'
import CategoryList from 'pages/CategoryList'
import Layout from 'pages/Layout'
import ArticleDetail from 'pages/ArticleDetail'
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
