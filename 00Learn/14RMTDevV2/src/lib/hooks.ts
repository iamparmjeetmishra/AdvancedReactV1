import { useEffect, useState } from "react";
import { TJobItem, TJobItemData } from "./type";
import { BASE_API_URL } from "./constants";

export function useJobItems(searchText: string) {
	const [jobItems, setJobItems] = useState<TJobItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const jobItemsSliced = jobItems.slice(0, 7);

	useEffect(() => {
		if (!searchText) return;

		const fetchJobs = async () => {
			setIsLoading(true);
			try {
				const res = await fetch(
					`${BASE_API_URL}?search=${searchText}`
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

	return [jobItemsSliced, isLoading] as const;
}

export function useActiveId() {
	const [activeId, setActiveId] = useState<number | null>(null);

	useEffect(() => {
		const handleHashChange = () => {
			const id = +window.location.hash.slice(1);
			setActiveId(id);
		};
		handleHashChange();

		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	return activeId;
}

export function useJobItem(id: number | null) {
	const [jobItem, setJobItem] = useState<TJobItemData | null>(null);
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (!id) return;

		const fetchData = async () => {
			try {
				setIsLoading(true)
				const res = await fetch(`${BASE_API_URL}/${id}`);
				const data = await res.json();
				setIsLoading(false)
				setJobItem(data.jobItem);
			} catch (error) {
				console.log("ListingErr:", error);
			}
		};
		fetchData();
	}, [id]);
	return { jobItem, isLoading } as const;
}
