
export default function SearchForm({ headerEffect }) {
	const handleSearchForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleSearchInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		headerEffect.setSearchText(e.target.value);
	};

	return (
		<form onSubmit={handleSearchForm} className="search">
			<button type="submit">
				<i className="fa-solid fa-magnifying-glass"></i>
			</button>

			<input
				value={headerEffect.searchText}
				onChange={handleSearchInput}
				spellCheck="false"
				type="text"
				required
				placeholder="Find remote developer jobs..."
			/>
		</form>
	);
}
