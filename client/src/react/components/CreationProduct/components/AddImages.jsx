import { useState } from "react";

import {
	handleAddImage,
	handleShowAddingImage,
	handleSubmitAddImage,
} from "../handlers";
import CreateIcon from "../../svg/CreateIcon";

import s from "./AddImages.module.css";

export default function AddImages({
	canAddImage,
	setCanAddImage,
	input,
	setInput,
	errors,
	setError,
	validate,
}) {
	const [urlImage, setUrlImage] = useState("");
	const [urlError, setUrlError] = useState("");

	const validateUrl = (urlImage) => {
		const expression =
			/(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)/g;

		const regex = new RegExp(expression);

		let error = "";

		if (!urlImage || !regex.test(urlImage))
			error = "Por favor inserte una URL válida";

		return error;
	};

	return (
		<div className={s.container}>
			<label>Add image:</label>
			<span
				onClick={(e) => handleShowAddingImage(e, canAddImage, setCanAddImage)}
			>
				<CreateIcon />
			</span>

			{canAddImage ? (
				<div className={s.containerImageUrl}>
					<label htmlFor="imageUrl">Add URL image: </label>
					<input
						id="imageUrl"
						name="imageUrl"
						type="url"
						placeholder="https://example.com"
						value={input.urlImage}
						onChange={(e) =>
							handleAddImage(e, urlImage, setUrlImage, setUrlError, validateUrl)
						}
					/>
					<button
						disabled={(!urlImage || urlError.length) && true}
						onClick={(e) =>
							handleSubmitAddImage(
								e,
								input,
								setInput,
								setError,
								validate,
								urlImage,
								setCanAddImage,
							)
						}
					>
						Add
					</button>

					{urlError ? <i>{urlError}</i> : ""}
				</div>
			) : (
				""
			)}

			{errors.images && input.images !== "" ? <p>{errors.images}</p> : ""}
		</div>
	);
}
