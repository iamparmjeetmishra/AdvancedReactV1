import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import { PetProp } from "@/lib/types";

type LayoutProps = {
	children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
	const res = await fetch(
		"https://bytegrad.com/course-assets/projects/petsoft/api/pets"
	);
	if (!res.ok) {
		throw new Error("Could not fetch pets data");
	}
   const data: PetProp[] = await res.json();
   
	return (
		<>
			<BackgroundPattern />
			<div className="flex flex-col min-h-screen max-w-[1050px] mx-auto px-4">
				<AppHeader />
				<PetContextProvider data={data}>{children}</PetContextProvider>
				<AppFooter />
			</div>
		</>
	);
}
