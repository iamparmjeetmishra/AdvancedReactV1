import { useEffect, useState } from "react";

export function useJobItems(searchText: string) {
	const [jobItems, setJobItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const jobItemsSliced = jobItems.slice(0, 7)

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

	return {
		jobItemsSliced,
		setJobItems,
		isLoading,
		setIsLoading,
	};
}
