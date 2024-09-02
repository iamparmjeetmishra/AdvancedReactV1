import EventCard from "./event-card";
import { getEvents } from "@/lib/utils";

type TEventListProps = {
	city: string;
};

export default async function EventsList({ city }: TEventListProps) {
	const events = await getEvents(city)

	return (
		<section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-5">
			{events.map((event) => (
				<EventCard key={event.id} event={event} />
			))}
		</section>
	);
}
