import { cn } from "@/lib/utils";

export default function Skelton({
	className,
}: {
	className?: string;
}) {
	return (
		<div
			className={cn(
				"animate-pulse h-4 w-[500px] rounded-md bg-white/5",
				className
			)}
		/>
	);
}
