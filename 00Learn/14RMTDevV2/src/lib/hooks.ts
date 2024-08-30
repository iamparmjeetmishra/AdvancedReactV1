import { useEffect, useState } from "react";
import { TJobItem, TJobItemData } from "./type";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";

/* -----------------------------*/
// export function useJobItems(searchText: string) {
// 	const [jobItems, setJobItems] = useState<TJobItem[]>([]);
// 	const [isLoading, setIsLoading] = useState(false);

// 	useEffect(() => {
// 		if (!searchText) return;

// 		const fetchJobs = async () => {
// 			setIsLoading(true);
// 			try {
// 				const res = await fetch(
// 					`${BASE_API_URL}?search=${searchText}`
// 				);
// 				const data = await res.json();
// 				setIsLoading(false);
// 				setJobItems(data.jobItems);
// 			} catch (error) {
// 				console.log("ErrWhileFetching", error);
// 			}
// 		};
// 		fetchJobs();
// 	}, [searchText]);

// 	return { jobItems, isLoading } as const;
// }

type TJobItemsApiResponse = {
	public: boolean;
	sorted: boolean;
	jobItems: TJobItem[];
};

const fetchJobItems = async (
	searchText: string
): Promise<TJobItemsApiResponse> => {
	const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
	
	if (!res.ok) {
		const errData = await res.json()
		throw new Error(errData.description)
	}

	const data = await res.json();
	return data;
};

export function useJobItems(searchText: string) {
	const { data, isInitialLoading } = useQuery(
		["job-items", searchText],
		() => fetchJobItems(searchText),
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(searchText),
			onError: handleError,
		}
	);

	return {
		jobItems: data?.jobItems,
		isLoading: isInitialLoading,
	} as const;
}

/*-------------------------------*/

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

// export function useJobItem(id: number | null) {
// 	const [jobItem, setJobItem] = useState<TJobItemData | null>(null);
// 	const [isLoading, setIsLoading] = useState(false);

// 	useEffect(() => {
// 		if (!id) return;

// 		const fetchData = async () => {
// 			try {
// 				setIsLoading(true);
// 				const res = await fetch(`${BASE_API_URL}/${id}`);
// 				const data = await res.json();
// 				setIsLoading(false);
// 				setJobItem(data.jobItem);
// 			} catch (error) {
// 				console.log("ListingErr:", error);
// 			}
// 		};
// 		fetchData();
// 	}, [id]);
// 	return { jobItem, isLoading } as const;
// }

type TJobItemApiResponse = {
	public: boolean;
	jobItem: TJobItemData;
};

const fetchJobItem = async (
	id: number | null
): Promise<TJobItemApiResponse> => {
	const res = await fetch(`${BASE_API_URL}/${id}`);
	//4xx or 5xx
	if (!res.ok) {
		const errorData = await res.json();
		console.log("fetchJob:", errorData.description);
		throw new Error(errorData.description);
	}
	const data = await res.json();
	return data;
};

export function useJobItem(id: number | null) {
	const { data, isInitialLoading } = useQuery(
		["job-item", id],
		() => fetchJobItem(id),
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(id),
			onError: handleError,
		}
	);
	return {
		jobItem: data?.jobItem,
		isLoading: isInitialLoading,
	} as const;
}

export function useDebounce<T>(value: T, delay = 500): T {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timerId);
	}, [value, delay]);

	return debouncedValue;
}
