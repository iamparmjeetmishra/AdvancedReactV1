"use client";
import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useTransition } from "react";

type TPaymentProps = {
   searchParams: {[key: string]: string | string[] | undefined}
}

export default function PaymentPage({ searchParams }: TPaymentProps) {
	const [isPending, startTransition] = useTransition();
	return (
		<main className="flex flex-col gap-3 items-center">
			<H1>PetSoft access requires payment</H1>
			{!searchParams.success && (
            <Button
               disabled={isPending}
					onClick={async () => {
						startTransition(async () => {
							await createCheckoutSession();
						});
					}}
				>
					Buy lifetime access for $299
				</Button>
			)}
			{searchParams.success && (
				<>
					<p className="text-green-700">
						Payment successfull. You now have lifetime access to
						PetCare.
					</p>
					<Button>
						<Link
							href="/app/dashboard"
							className="flex items-center gap-2"
						>
							<span>Go to dashboard</span>
							<ArrowRightIcon />
						</Link>
					</Button>
				</>
			)}
			{searchParams.cancelled && (
				<>
					<p className="text-red-700">
						Payment cancelled. You can try again.
					</p>
				</>
			)}
		</main>
	);
}
