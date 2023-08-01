import { useState } from 'react';
import './Searchba.css'

const Searchbar = ({handlerFormSubmit}) => {
  const [searchValue, setSearchValue] = useState("");

  const handlerInput = e => {
    setSearchValue(e.currentTarget.value)
  };

  const handlerForm = e => {
    e.preventDefault();

    if (searchValue.trim() === "") {
      alert("Поле пошуку порожне")
      return;
    }

    handlerFormSubmit(searchValue);

    setSearchValue("")
  };

  return (
    <header className="searchbar">
      <form onSubmit={handlerForm} className="form">
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          value={searchValue}
          placeholder="Search images and photos"
          onChange={handlerInput}
        />
      </form>
    </header>
  );
}

export default Searchbar;
