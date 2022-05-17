import React from "react";
import ChatBot from "../ChatBot/ChatBot";
import NavBar from "../NavBar/NavBar";
import LandingBanners from "./Banners/LandingBanners/LandingBanners";
import style from "./Landing.module.css";
import NewsMen from "./Section/NewsMen/NewsMen";
import NewsWomen from "./Section/NewsWomen/NewsWomen";

function Landing() {
	return (
		<div className={style.landingContainer}>
			<NavBar />
			<LandingBanners />
			<div className={style.landingMainContainer}>
				<NewsMen />
				<NewsWomen />
			</div>
			<ChatBot />
		</div>
	);
}

export default Landing;
