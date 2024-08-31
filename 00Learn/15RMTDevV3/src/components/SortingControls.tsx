import { TSortBy } from "../lib/type";

type TSortingProps = {
	onClick: (newSortBy: TSortBy) => void;
	sortBy: TSortBy;
};

export default function Sorting({ onClick, sortBy }: TSortingProps) {
	return (
		<section className="sorting">
			<i className="fa-solid fa-arrow-down-short-wide"></i>

			<SortingButton
				onClick={() => onClick("relevant")}
				sortBy={"relevant"}
				isActive={sortBy === "relevant"}
			/>
			<SortingButton
				onClick={() => onClick("recent")}
				sortBy={"recent"}
				isActive={sortBy === "recent"}
			/>
		</section>
	);
}

type TSortingButtonProps = {
	onClick: () => void;
	sortBy: TSortBy;
	isActive: boolean;
};

function SortingButton({
	onClick,
	sortBy,
	isActive,
}: TSortingButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`sorting__button sorting__button--recent 
				${isActive && " sorting__button--active"}
				`}
		>
			{sortBy === "relevant" ? "relevant" : "recent"}
		</button>
	);
}
