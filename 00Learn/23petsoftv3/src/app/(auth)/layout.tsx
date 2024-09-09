import Logo from "@/components/logo";
import React from "react";

type TLayoutProps = {
	children: React.ReactNode;
};

export default function layout({ children }: TLayoutProps) {
	return (
		<div className="flex flex-col gap-y-5 items-center justify-center min-h-screen">
			<Logo />
			{children}
		</div>
	);
}
