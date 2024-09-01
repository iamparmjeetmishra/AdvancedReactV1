import { TEventoEvent } from "@/lib/types";
import EventCard from "./event-card";

type TEventListProps = {
	events: TEventoEvent[];
};

export default function EventList({ events }: TEventListProps) {
	return (
		<section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-5">
			{events.map((event) => (
				<EventCard key={event.id} event={event} />
			))}
		</section>
	);
}
