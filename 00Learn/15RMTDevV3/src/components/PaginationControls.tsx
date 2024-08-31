import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { TPageDirection } from "../lib/type";

type TPaginationControlsProps = {
	onClick: (direction: TPageDirection) => void;
	currentPage: number;
	totalNumOfPage: number;
};

export default function Pagination({
	onClick,
	currentPage,
	totalNumOfPage,
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
			{currentPage < totalNumOfPage && (
				<PaginationButton
					direction="next"
					currentPage={currentPage}
					onClick={() => onClick("next")}
				/>
			)}
		</section>
	);
}

type TPaginationButtonProps = {
	direction: TPageDirection;
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
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
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
