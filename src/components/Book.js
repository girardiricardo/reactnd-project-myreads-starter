import React from 'react';

const Book = ({ book, onShelfChange }) => (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 192,
          backgroundImage: `url(${(book.imageLinks &&
            book.imageLinks.thumbnail) ||
            ''})`
        }}
      ></div>
      <div className="book-shelf-changer">
        <select
          value={book.shelf || 'none'}
          onChange={e => onShelfChange(e.target.value, book)}
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">
      {(book.authors && book.authors.join(', ')) || 'Author name not found'}
    </div>
  </div>
)

export default Book
