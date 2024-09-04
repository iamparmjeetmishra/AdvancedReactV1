import Link from "next/link";
import EventCard from "./event-card";
import { getEvents } from "@/lib/server-utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { FIX_EVENT_ITEMS } from "@/lib/constants";

type TEventListProps = {
	city: string;
	page?: number;
};

export default async function EventsList({
	city,
	page = 1,
}: TEventListProps) {
	const { events, totalCount } = await getEvents(city, page);

	const previousPath =
		page > 1 ? `/events/${city}?page=${page - 1}` : "";
	const nextPath =
		totalCount > FIX_EVENT_ITEMS * page ? `/events/${city}?page=${page + 1}` : "";

	return (
		<section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-5">
			{events.map((event) => (
				<EventCard key={event.id} event={event} />
			))}
			<PaginationControls
				previousPath={previousPath}
				nextPath={nextPath}
			/>
		</section>
	);
}

type PaginationControlsProps = {
	previousPath: string;
	nextPath: string;
};

function PaginationControls({
	previousPath,
	nextPath,
}: PaginationControlsProps) {
	const btnStyles = `flex gap-2 items-center bg-white/5 px-4 py-2 rounded-md hover:bg-white/20 hover:text-white hover:ring-white/10 hover:ring-2`;

	return (
		<section className="flex justify-between w-full">
			{previousPath ? (
				<Link href={previousPath} className={btnStyles}>
					<ArrowLeftIcon /> Previous Page
				</Link>
			) : (
				<div />
			)}
			{nextPath ? (
				<Link href={nextPath} className={btnStyles}>
					Next <ArrowRightIcon />
				</Link>
			) : '' }
		</section>
	);
}
