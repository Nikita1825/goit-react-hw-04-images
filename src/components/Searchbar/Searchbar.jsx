import { useState } from 'react';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSearch }) => {
  const [value, setValue] = useState('');

 const hundleSubmit = e => {
    e.preventDefault();
    onSearch(value);
  };
 const handleChange = e => {
    const { value } = e.target;
   setValue(value)
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={hundleSubmit}>
        <button type="submit" className="SearchFormbutton">
          <span className="SearchFormbuttonlabel">Search</span>
        </button>

        <input
          className="SearchForminput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
