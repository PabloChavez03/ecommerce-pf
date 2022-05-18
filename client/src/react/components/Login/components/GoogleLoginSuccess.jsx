import React from "react";
import { useEffect } from "react";
import s from "./loginsuccess.module.css";

function GoogleLoginSuccess() {
	useEffect(() => {
		setTimeout(() => {
			window.close();
		}, 2000);
	}, []);

	return (
		<div className={s.container}>
			<h1 className={s.text}>
				Successfully <br /> authenticated
			</h1>
		</div>
	);
}

export default GoogleLoginSuccess;
