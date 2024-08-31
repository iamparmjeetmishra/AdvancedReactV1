import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { useContext } from "react";

type TBookmarkIconProps = {
	id: number;
};

export default function BookmarkIcon({ id }: TBookmarkIconProps) {
	const { bookmarkedIds, handleToggleBookmark } =
		useContext(BookmarksContext);

	return (
		<button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleToggleBookmark(id)
      }
      }
			className="bookmark-btn"
		>
			<BookmarkFilledIcon className={bookmarkedIds.includes(id) ? 'filled' : ''} />
		</button>
	);
}
