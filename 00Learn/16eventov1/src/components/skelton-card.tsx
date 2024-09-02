import Skelton from "./skelton";

export default function SkeltonCard() {
   return <div className="space-y-4">
      <Skelton className="h-12 w-12 rounded-full" />
      <Skelton className="h-4 w-[250px]" />
      <Skelton className="h-4 w-[200px]" />
   </div>;
}
