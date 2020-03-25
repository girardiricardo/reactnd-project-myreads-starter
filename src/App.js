import React, { Component } from "react";
import { Route } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

import "./App.css";

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };

    this.fetchBooks = this.fetchBooks.bind(this);
    this.handleShelfChange = this.handleShelfChange.bind(this);
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  handleShelfChange(shelf, book) {
    const { books } = this.state;

    const filteredBooks = books.filter(b => b.id !== book.id);

    BooksAPI.update(book, shelf).then(() => {
      this.setState({
        books:
          shelf === "none"
            ? filteredBooks
            : [...filteredBooks, { ...book, shelf }]
      });
    });
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <HomePage books={books} onShelfChange={this.handleShelfChange} />
          )}
        />
        <Route
          exact
          path="/search"
          render={({ history }) => (
            <SearchPage
              books={books}
              onShelfChange={(shelf, book) => {
                this.handleShelfChange(shelf, book);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
