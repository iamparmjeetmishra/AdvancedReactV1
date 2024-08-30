import { useEffect, useState } from "react";
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

function App() {
	const [searchText, setSearchText] = useState("");
	const [jobItems, setJobItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!searchText) return;

		const fetchJobs = async () => {
			setIsLoading(true);
			try {
				const res = await fetch(
					`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
				);
				const data = await res.json();
				setIsLoading(false);
				setJobItems(data.jobItems);
			} catch (error) {
				console.log("ErrWhileFetching", error);
			}
		};
		fetchJobs();
	}, [searchText]);
	console.log(jobItems);

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
							count={jobItems.length > 0 ? jobItems.length : 0}
						/>
						<Sorting />
					</SidebarTop>
					<JobList jobItems={jobItems} isLoading={isLoading} />
					<Pagination />
				</Sidebar>
				<JobItemContent />
			</Container>
			<Footer />
		</>
	);
}

export default App;
