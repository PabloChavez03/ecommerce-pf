import { useState } from "react";
import { handleChangeMoreInfo, handleSubmitInfo } from "../handlers";

import CreateIcon from "../../svg/CreateIcon";
import s from "./AddInfo.module.css";

export default function AddInfo({
	input,
	setInput,
	errors,
	setError,
	validate,
}) {
	const [addMoreInfo, setAddMoreInfo] = useState(false);
	const [moreInfo, setMoreInfo] = useState({
		aboutMe: "",
		sizeAndFit: "",
		careInfo: "",
	});

	return (
		<fieldset className={s.container}>
			<legend>Aditional Info</legend>
			<span
				onClick={() => {
					setAddMoreInfo(!addMoreInfo);
				}}
			>
				<CreateIcon />
			</span>

			{addMoreInfo ? (
				<div className={s.addInfoContainer}>
					<label htmlFor="aboutMe">About Me:</label>
					<input
						className={s.input}
						type="text"
						name="aboutMe"
						id="aboutMe"
						value={moreInfo.aboutMe}
						onChange={(e) => handleChangeMoreInfo(e, moreInfo, setMoreInfo)}
					/>

					<label htmlFor="sizeAndFit">Size And Fit</label>
					<input
						className={s.input}
						type="text"
						name="sizeAndFit"
						id="sizeAndFit"
						value={moreInfo.sizeAndFit}
						onChange={(e) => handleChangeMoreInfo(e, moreInfo, setMoreInfo)}
					/>

					<label htmlFor="careInfo">Care info:</label>
					<input
						className={s.input}
						type="text"
						name="careInfo"
						value={moreInfo.careInfo}
						onChange={(e) => handleChangeMoreInfo(e, moreInfo, setMoreInfo)}
					/>

					<button
						className={s.button}
						onClick={(e) =>
							handleSubmitInfo(
								e,
								moreInfo,
								setMoreInfo,
								input,
								setInput,
								setAddMoreInfo,
							)
						}
					>
						Agregar
					</button>
				</div>
			) : (
				""
			)}
		</fieldset>
	);
}
