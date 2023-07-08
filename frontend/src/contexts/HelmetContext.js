import React, { createContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export const HelmetContext = createContext("");

export default function HelmetProvider({ children }) {
	const [focus, setFocus] = useState(true);
	const [title, setTitle] = useState("SOWEHA");
	const [description, setDescription] = useState("SOWEHA");
	const [icon, setIcon] = useState("https://github.com/soweha.png");

	useEffect(() => {
		if (!title) setTitle("SOWEHA");
		if (!description) setDescription("SOWEHA");
		if (!icon) setIcon("https://github.com/soweha.png");
	}, [title, description, icon]);

	useEffect(() => {
		const handleBlur = () => setFocus(false);
		const handleFocus = () => setFocus(true);

		window.addEventListener("blur", handleBlur);
		window.addEventListener("focus", handleFocus);

		return () => {
			window.removeEventListener("blur", handleBlur);
			window.removeEventListener("focus", handleFocus);
		};
	}, []);
    
	return (
		<HelmetContext.Provider value={{ setTitle, setDescription, setIcon }}>
			<>
				<Helmet>
					<title>{`${focus ? " " +  (title !== "SOWEHA" ? `${title} | SOWEHA` : title)  : " Come Back :) | SOWEHA "}`}</title>
					<meta name='description' content={description} />
					<link rel='icon' href={icon} />
				</Helmet>
				{children}
			</>
		</HelmetContext.Provider>
	);
}