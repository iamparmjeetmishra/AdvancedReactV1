import H1 from "@/components/h1";
import { getEvent } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";

type TProps = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({
	params,
}: TProps): Promise<Metadata> {
	const slug = params.slug;
	const event = await getEvent(slug);
	return {
		title: event.name,
	};
}

export async function generateStaticParams() {
	return [
		{
			slug: "dj-practice-session",
		},
		{
			slug: 'science-space-expo'
		},
		{
			slug: 'global-food-festival'
		}
	];
}

export default async function EventPage({ params }: TProps) {
	const { slug } = params;
	const event = await getEvent(slug);

	return (
		<main>
			<section className="relative  overflow-hidden flex justify-center items-center py-14 md:py-20">
				<Image
					className="object-cover blur-3xl	z-0"
					src={event.imageUrl}
					alt="Event Background image"
					fill
					quality={50}
					sizes="(max-width: 1280px) 100vw, 1280px"
					priority
				/>
				<div className="flex flex-col lg:flex-row gap-6 lg:gap-16 z-1 relative">
					<Image
						src={event.imageUrl}
						alt={event.name}
						width={300}
						height={201}
						className="rounded-xl border-2 border-white/50 object-cover"
					/>
					<div className="flex flex-col">
						<p className=" text-white/75">
							{new Date(event.date).toLocaleDateString("en-US", {
								weekday: "long",
								month: "long",
								day: "numeric",
							})}
						</p>
						<H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
							{event.name}
						</H1>
						<p className="whitespace-nowrap text-xl text-white/75">
							Organized by{" "}
							<span className="italic">{event.organizerName}</span>
						</p>
						<button className="bg-white/20 text-lg capitalize bg-blue w-[95vw] sm:w-full rounded-md border-white/10 border-2 py-2 lg:mt-auto mt-5 state-effects">
							Get tickets
						</button>
					</div>
				</div>
			</section>
			<div className="text-center px-5 py-16 min-h-[75vh]">
				<Section>
					<SectionHeading>About this event</SectionHeading>
					<SectionParagraph>{event.description}</SectionParagraph>
				</Section>
				<Section>
					<SectionHeading>Location</SectionHeading>
					<SectionParagraph>{event.location}</SectionParagraph>
				</Section>
			</div>
		</main>
	);
}

function Section({ children }: { children: React.ReactNode }) {
	return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
	return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionParagraph({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">
			{children}
		</p>
	);
}
