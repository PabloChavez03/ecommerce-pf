import React from "react";
import style from "./TitleSection.module.css";

const TitleSection = ({ title }) => {
	return (
		<>
			<h2 className={style.titleLanding}>{title}</h2>
		</>
	);
};

export default TitleSection;
