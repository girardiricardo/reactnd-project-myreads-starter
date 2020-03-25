import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Shelf from '../components/Shelf';

const HomePage = ({ books, onShelfChange }) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <Shelf
        title="Currently Reading"
        items={books.filter(b => b.shelf === 'currentlyReading')}
        onShelfChange={onShelfChange}
      />
      <Shelf
        title="Want to Read"
        items={books.filter(b => b.shelf === 'wantToRead')}
        onShelfChange={onShelfChange}
      />
      <Shelf
        title="Read"
        items={books.filter(b => b.shelf === 'read')}
        onShelfChange={onShelfChange}
      />
    </div>
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);

HomePage.propTypes = {
  books: PropTypes.array.isRequired
};

export default HomePage;
