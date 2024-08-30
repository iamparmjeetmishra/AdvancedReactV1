import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type TPaginationControlsProps = {
	onClick: (direction: "next" | "previous") => void;
	currentPage: number;
};

export default function Pagination({
	onClick,
	currentPage,
}: TPaginationControlsProps) {
	return (
		<section className="pagination">
			{currentPage > 1 && (
				<PaginationButton
					direction="previous"
					currentPage={currentPage}
					onClick={() => onClick("previous")}
				/>
			)}
			<PaginationButton
				direction="next"
				currentPage={currentPage}
				onClick={() => onClick("next")}
			/>
		</section>
	);
}

type TPaginationButtonProps = {
	direction: "next" | "previous";
	onClick: () => void;
	currentPage: number;
};

function PaginationButton({
	direction,
	onClick,
	currentPage,
}: TPaginationButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`pagination__button pagination__button--${direction}`}
		>
			{direction === "previous" && (
				<>
					<ArrowLeftIcon /> Page {currentPage - 1}
				</>
			)}
			{direction === "next" && (
				<>
					Page {currentPage + 1} <ArrowRightIcon />
				</>
			)}
		</button>
	);
}
