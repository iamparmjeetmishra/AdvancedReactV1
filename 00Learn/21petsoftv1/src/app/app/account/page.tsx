import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";

export default function AccountPage() {
	return (
		<main className="flex flex-col">
			
				<H1 className="text-white py-8">Your Account</H1>
			
			<ContentBlock className="h-[500px] flex justify-center items-center">
				<p>Logged in as ...</p>
			</ContentBlock>
		</main>
	);
}
