import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;

    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      toast.error("Please, enter your query!");
      return;
    }

    onSubmit(input);
    reset();
  };

  const reset = () => {
    setInput("");
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
