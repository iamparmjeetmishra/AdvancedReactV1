import EventList from "@/components/event-list";
import H1 from "@/components/h1";
import { TEventoEvent } from "@/lib/types";
import { TextCapitalize } from "@/lib/utils";
import toast from "react-hot-toast";

type TEventPageProps = {
	params: {
		city: string;
	};
};

export default async function EventPage({ params }: TEventPageProps) {
	
	let res = await fetch(
		"https://bytegrad.com/course-assets/projects/evento/api/events?city=austin"
	);
	const events: TEventoEvent[] = await res.json();
	const city = params.city;

	return (
		<main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
			<H1 className="mb-28">
				{city === "all" && "All Events"}
				{city !== "all" && `Events in ${TextCapitalize(city)}`}
			</H1>
			<EventList events={events} />
		</main>
	);
}
