import SkeltonCard from "@/components/skelton-card";

export default function Loading() {
   return <div className="flex flex-wrap items-center justify-center max-w-[1100px] mx-auto px-5 py-5 gap-20">
      {
         Array.from({ length: 6 }).map((item, index) => (
            <SkeltonCard key={index} />
         ))
      }
   </div>;
}
