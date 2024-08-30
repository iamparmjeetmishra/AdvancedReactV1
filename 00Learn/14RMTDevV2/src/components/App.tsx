import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import Pagination from "./PaginationControls";
import JobList from "./JobList";
import Sorting from "./SortingControls";
import ResultsCount from "./ResultsCount";
import { useDebounce, useJobItems } from "../lib/hooks";

function App() {
	const [searchText, setSearchText] = useState("");
	
	const debouncedSearchText = useDebounce(searchText)
	
	const { jobItems, isLoading } = useJobItems(debouncedSearchText);
	const jobItemsNumber = jobItems?.length || 0
	const jobItemsSliced = jobItems?.slice(0, 7) || []

	return (
		<>
			<Background />
			<Header>
				<HeaderTop>
					<Logo />
					<BookmarksButton />
				</HeaderTop>
				<SearchForm searchText={searchText} setSearchText={setSearchText}  />
			</Header>

			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount
							count={jobItemsNumber > 0 ? jobItemsNumber : 0}
						/>
						<Sorting />
					</SidebarTop>
					<JobList jobItems={jobItemsSliced} isLoading={isLoading} />
					<Pagination />
				</Sidebar>
				<JobItemContent />
			</Container>
			<Footer />
		</>
	);
}

export default App;
