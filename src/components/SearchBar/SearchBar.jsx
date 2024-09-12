import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      return toast.error("Cannot be empty!");
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <header className={css.container}>
      <form onSubmit={handleSubmit} className={css.wraper}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      <Toaster position="top-right" />
    </header>
  );
}
