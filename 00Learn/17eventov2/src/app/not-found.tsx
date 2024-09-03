import Link from "next/link";

export default function NotFound() {
	return <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
		<h2 className="text-2xl font-bold">Not Found What you are looking for</h2>
		<Link href={'/events/all'} className="bg-accent text-black py-2 px-4 rounded-md hover:bg-white hover:text-black hover:ring-accent hover:ring-2">Get back to all events</Link>
	</div>;
}
