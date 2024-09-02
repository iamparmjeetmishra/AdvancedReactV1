"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SearchForm() {
   const [searchText, setSearchText] = useState('')
	
   const router = useRouter();
   
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (!searchText) {
         toast.error('Please enter a search term.')
         return;
      }

      router.push(`/events/${searchText}`)
	};
	return (
		<form onSubmit={handleSubmit} className="w-full sm:w-[580px]  ">
         <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
				className="w-full h-16 px-6 rounded-lg bg-white/[7%] outline-none focus:ring-customAccent/50 transition focus:ring-2 focus:bg-white/10"
				placeholder="Search text events in any city..."
            spellCheck={false}
            aria-label="Search Events"
			/>
		</form>
	);
}