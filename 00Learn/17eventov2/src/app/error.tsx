"use client";

import H1 from "@/components/h1";
import { error } from "console";
import Link from "next/link";
import { useEffect } from "react";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};



export default function Error({ error, reset }: ErrorProps) {
   useEffect(() => {
      console.log(error)
   }, [error])
	return (
		<main className="text-center py-24">
         <H1>Something went wrong!</H1>
         <p className="my-6 border w-fit mx-auto p-2 rounded-md">{ error.message}</p>
         <Link
            href={'/events/all'}
         >
            <button
               className="bg-accent text-black py-2 px-4 rounded-md hover:bg-black/5 hover:text-white hover:ring-accent hover:ring-2"
            
            >Go back to events</button>
         </Link>
		</main>
	);
}
