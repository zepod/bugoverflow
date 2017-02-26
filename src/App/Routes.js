import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Components
import ArticleList from 'features/ArticleList'
import Layout from 'features/Layout'
import ArticleDetail from 'features/ArticleDetail'
import NotFound from 'NotFound'

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={ArticleList} />
        <Route path="article/:id" component={ArticleDetail} />
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  )
}

export default Routes
