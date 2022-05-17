import React, { useEffect, useState } from "react";
import { Slideshow, Slide, TextoSlide } from "../Slideshow/Slideshow";
import img1 from "../img/imgbanner1.jpg";
import img2 from "../img/imgbanner2.jpg";
import img3 from "../img/imgbanner3.jpg";
import img1mob from "../img/imgbanner1-mobile.jpg";
import img2mob from "../img/imgbanner2-mobile.jpg";
import img3mob from "../img/imgbanner3-mobile.jpg";
import style from "./LandingBanners.module.css";

// import img1mob from "../img/imgbanner1-mobile.jpg";

const LandingBanners = () => {
	const [mobile, setMobile] = useState();

	useEffect(() => {
		if (window.screen.width < 650) {
			setMobile(true);
		} else {
			setMobile(false);
		}

		window.addEventListener("resize", changeScreen);

		function changeScreen(e) {
			if (window.screen.width < 650) {
				setMobile(true);
			} else {
				setMobile(false);
			}
		}
	}, []);

	return (
		<>
			<Slideshow controles={true}>
				<Slide>
					<a href='/home?gender=Men'>
						<img src={mobile ? img1mob : img1} alt='' className={style.imgBanner} />
					</a>
					<TextoSlide>
						<p>Texto fachero, ya tu sabeee paa rrrrraaaaa</p>
					</TextoSlide>
				</Slide>
				<Slide>
					<a href='/home?gender=Women'>
						<img src={mobile ? img2mob : img2} alt='' className={style.imgBanner} />
					</a>
					<TextoSlide>
						<p>Yo soy Kenneth</p>
					</TextoSlide>
				</Slide>
				<Slide>
					<a href='/home?gender=Men'>
						<img src={mobile ? img3mob : img3} alt='' className={style.imgBanner} />
					</a>
					<TextoSlide>
						<p>Team caballeros del zodiaco</p>
					</TextoSlide>
				</Slide>
			</Slideshow>
		</>
	);
};

export default LandingBanners;
