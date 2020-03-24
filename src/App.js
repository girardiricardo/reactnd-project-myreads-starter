import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// import * as BooksAPI from './BooksAPI'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'

import './App.css'

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <HomePage />} />
        <Route exact path="/search" render={() => <SearchPage />} />
      </div>
    )
  }
}

export default BooksApp
