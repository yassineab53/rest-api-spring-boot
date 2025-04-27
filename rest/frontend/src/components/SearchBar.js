import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search posts"
        />
        {searchTerm && (
          <InputGroup.Text 
            style={{ cursor: 'pointer' }}
            onClick={() => onSearchChange('')}
          >
            ✕
          </InputGroup.Text>
        )}
      </InputGroup>
    </div>
  );
};

export default SearchBar;