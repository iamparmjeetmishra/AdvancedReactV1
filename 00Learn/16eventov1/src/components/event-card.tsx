import { TEventoEvent } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type TEventCardProps = {
	event: TEventoEvent;
};

export default function EventCard({ event }: TEventCardProps) {
	return (
		<Link href={`/event/${event.slug}`} className="flex-1 basis-80 h-[380px] max-w-[500px]">
			<section
				className="flex flex-col w-full h-full bg-white/[3%] relative state-effects"
				key={event.id}
			>
				<Image
					src={event.imageUrl}
					alt={event.name}
					width={500}
					height={280}
					className="h-[60%] object-cover bg-white/[3%] rounded-xl overflow-hidden"
				/>
				<div className="flex flex-col flex-1 justify-center items-center">
					<h2 className="text-2xl font-semibold">{event.name}</h2>
					<p className="italic text-white/75">
						By {event.organizerName}
					</p>
					<p className="text-sm text-white/50 mt-4">
						{event.location}
					</p>
				</div>
				<section className="flex flex-col flex-1 justify-center absolute left-[12px] top-[12px] h-11 bg-black/30 p-2 rounded-md">
					<p className="text-xl font-bold -mb-[5px]">
						{new Date(event.date).toLocaleDateString("en-US", {
							day: "2-digit",
						})}
					</p>
					<p className="text-xs uppercase text-accent">
						{new Date(event.date).toLocaleDateString("en-US", {
							month: "short",
						})}
					</p>
				</section>
			</section>
		</Link>
	);
}
