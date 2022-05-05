import React from "react";
import CategorySlider from "../CategorySlider/CategorySlider";
import ChatBot from "../ChatBot/ChatBot";
import NavBar from "../NavBar/NavBar";

function Landing() {
	return (
		<div>
			<NavBar />
			<CategorySlider />
			<ChatBot/>
		</div>
	);
}

export default Landing;
