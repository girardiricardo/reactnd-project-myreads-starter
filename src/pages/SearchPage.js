import React, { Component } from "react";
import { Link } from "react-router-dom";

import Book from "../components/Book";
import * as BooksAPI from "../BooksAPI";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: []
    };

    this.timeout = 0;

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.fetchQuery = this.fetchQuery.bind(this);
  }

  handleQueryChange(e) {
    this.setState({
      query: e.target.value
    });

    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.checkAndFetch();
    }, 300);
  }

  checkAndFetch() {
    const { query } = this.state;

    if (query === "") return this.setState({ results: [] });

    this.fetchQuery();
  }

  fetchQuery() {
    const { query } = this.state;
    const { books } = this.props;

    BooksAPI.search(query).then(response => {
      if (response.error && response.error === "empty query") {
        return this.setState({
          results: []
        });
      }

      this.setState({
        results: response.map(r => {
          const book = books.find(b => b.id === r.id);

          if (book) {
            return { ...r, shelf: book.shelf };
          }

          return r;
        })
      });
    });
  }

  render() {
    const { onShelfChange } = this.props;
    const { query, results } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleQueryChange}
              value={query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.length !== 0 &&
              results.map(r => (
                <li key={r.id}>
                  <Book book={r} onShelfChange={onShelfChange} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
