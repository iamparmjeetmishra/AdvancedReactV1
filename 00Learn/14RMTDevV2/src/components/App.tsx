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
import { Toaster } from "react-hot-toast";

function App() {
	//state
	const [searchText, setSearchText] = useState("");
	const [currentPage, setCurrentPage] = useState(1)
	const debouncedSearchText = useDebounce(searchText)
	const { jobItems, isLoading } = useJobItems(debouncedSearchText);
	
	// derived
	const jobItemsNumber = jobItems?.length || 0
	const jobItemsSliced = jobItems?.slice(0, 7) || []

	// event
	const handleChangePage = (direction: 'next' | 'previous') => {
		if (direction === 'next') {
			setCurrentPage((prev) => prev + 1)
		} else if (direction === 'previous') {
			setCurrentPage((prev) => prev - 1)
		}
	}

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
					<Pagination onClick={handleChangePage} currentPage={currentPage} />
				</Sidebar>
				<JobItemContent />
			</Container>
			<Footer />
			<Toaster position='top-right' />
		</>
	);
}

export default App;
