import { useState } from "react";

export default function SearchForm() {
  const [searchText, setSearchText] = useState('')

  const handleSearchForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  console.log(searchText)

  return (
    <form onSubmit={handleSearchForm} className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={handleSearchInput}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
