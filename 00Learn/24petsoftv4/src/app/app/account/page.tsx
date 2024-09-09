import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";

export default async function AccountPage() {
	const session = await auth()
	if (!session?.user) {
		redirect("/login")
	}
	// console.log(session)
	return (
		<main className="flex flex-col">
			
				<H1 className="text-white py-8">Your Account</H1>
			
			<ContentBlock className="h-[500px] flex justify-center items-center">
				<p>Logged in as <span className="font-medium">{ session?.user?.email }</span></p>
			</ContentBlock>
		</main>
	);
}
