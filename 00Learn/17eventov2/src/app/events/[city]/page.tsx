import EventsList from "@/components/events-list";
import H1 from "@/components/h1";
import { TextCapitalize } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import {z} from 'zod'

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

const pageNumberSchema = z.coerce.number().int().positive().optional()

type EventsPageProps = TProps & {
	searchParams: {
		[key: string]: string | string[] | undefined
	}
}

export default async function EventPage({ params, searchParams }: EventsPageProps) {
	const city = params.city;
	// const page = searchParams.page || 1;
	const parsedPage = pageNumberSchema.safeParse(searchParams.page)
	if (!parsedPage.success) {
		throw new Error('Invalid Page number')
	}

	return (
		<main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
			<H1 className="mb-28">
				{city === "all" && "All Events"}
				{city !== "all" && `Events in ${TextCapitalize(city)}`}
			</H1>
			<Suspense key={city + parsedPage.data} fallback={<Loading />}>
				<EventsList city={city} page={parsedPage.data} />
			</Suspense>
		</main>
	);
}
