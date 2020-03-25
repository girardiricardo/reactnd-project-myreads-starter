import React from 'react';

import Book from './Book';

const Shelf = ({ title, items, onShelfChange }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      {items.length === 0 && <span>No books for {title.toLowerCase()}</span>}
      {items.length !== 0 && (
        <ol className="books-grid">
          {items.map(i => (
            <li key={i.id}>
              <Book book={i} onShelfChange={onShelfChange} />
            </li>
          ))}
        </ol>
      )}
    </div>
  </div>
);

export default Shelf;
