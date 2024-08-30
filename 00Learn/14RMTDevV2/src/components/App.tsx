import {  useState } from "react";
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
import { useJobItems } from "../lib/hooks";

function App() {
	const [searchText, setSearchText] = useState("");
  const { setJobItems, isLoading, jobItemsSliced } = useJobItems(searchText)

	const headerEffect = {
		setJobItems,
		searchText,
		setSearchText,
	};

	return (
		<>
			<Background />
			<Header>
				<HeaderTop>
					<Logo />
					<BookmarksButton />
				</HeaderTop>
				<SearchForm headerEffect={headerEffect} />
			</Header>

			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount
							count={jobItemsSliced.length > 0 ? jobItemsSliced.length : 0}
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
