import EventsList from "@/components/events-list";
import H1 from "@/components/h1";
import { TextCapitalize } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";

type TProps = {
	params: {
		city: string;
	};
};

export function generateMetadata({ params }: TProps):Metadata {
	const city = params.city
	return {
		title: city === 'all' ? 'All Events' : `Events in ${TextCapitalize(city)}`
	}
}

export default async function EventPage({ params }: TProps) {
	const city = params.city;

	return (
		<main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
			<H1 className="mb-28">
				{city === "all" && "All Events"}
				{city !== "all" && `Events in ${TextCapitalize(city)}`}
			</H1>
			<Suspense fallback={<Loading />}>
				<EventsList city={city} />
			</Suspense>
		</main>
	);
}
