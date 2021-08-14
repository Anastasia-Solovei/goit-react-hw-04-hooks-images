import { useState } from "react";
// import { toast } from "react-toastify";
// import PropTypes from "prop-types";

// import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";

export default function Searchbar() {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;

    setInput(value);
  };

  return (
    <header className={s.Searchbar}>
      <form
        className={s.SearchForm}
        //onSubmit={handleSubmit}
      >
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}
