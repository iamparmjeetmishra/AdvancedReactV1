import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks";

type TBookmarkContext = {
	handleToggleBookmark: (id: number) => void;
	bookmarkedIds:number[] ;
};

export const BookmarksContext = createContext<TBookmarkContext | null>(null);

export default function BookmarksContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
		"bookmarkedIds",
		[]
	);

	console.log(bookmarkedIds);
	const handleToggleBookmark = (id: number) => {
		if (bookmarkedIds.includes(id)) {
			setBookmarkedIds((prev) => prev.filter((item) => item !== id));
		} else {
			setBookmarkedIds((prev) => [...prev, id]);
		}
	};

	return (
		<BookmarksContext.Provider
			value={{
				handleToggleBookmark,
				bookmarkedIds,
			}}
		>
			{children}
		</BookmarksContext.Provider>
	);
}

