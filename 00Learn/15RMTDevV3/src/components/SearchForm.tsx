type TSearchFormProps = {
	searchText: string;
	setSearchText: (searchText: string) => void;
};

export default function SearchForm({
	setSearchText,
	searchText,
}: TSearchFormProps) {
	const handleSearchForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleSearchInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchText(e.target.value);
	};

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
