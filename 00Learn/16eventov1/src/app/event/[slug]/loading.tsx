import Skelton from "@/components/skelton";

export default function Loading() {
	return <div className="flex flex-col items-center gap-y-4 pt-28">
		<Skelton className='h-4 w-[550px]' />
		<Skelton className='h-4 w-[400px]' />
		<Skelton className='h-4 w-[430px]' />
	</div>;
}
