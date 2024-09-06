"use client";
import { createContext, useContext, useState } from "react";

type Theme = 'dark' | 'light'

type ThemeContextProps = {
	theme: Theme;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextProps | null>(null);

type ThemeContextProviderProps = {
	children: React.ReactNode;
};

export default function ThemeContextProvider({
	children,
}: ThemeContextProviderProps) {
	const [theme, setTheme] = useState<Theme>("light");

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export function useThemeContext() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error(
			"Theme Context should be used within ThemeContextProvider"
		);
	}
	return context;
}
