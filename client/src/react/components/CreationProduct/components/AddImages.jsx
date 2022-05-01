import { useState } from "react";

import {
	handleAddImage,
	handleShowAddingImage,
	handleSubmitAddImage,
} from "../handlers";
import CreateIcon from "../../svg/CreateIcon";

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
			/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

		const regex = new RegExp(expression);

		if (!urlImage || !regex.test(urlImage)) {
			setUrlError("Por favor inserte una URL válida");
		} else {
			setUrlError("");
		}
	};

	return (
		<div>
			<label>Add image:</label>
			<span
				onClick={(e) => handleShowAddingImage(e, canAddImage, setCanAddImage)}
			>
				<CreateIcon />
			</span>

			{canAddImage ? (
				<div>
					<label htmlFor="imageUrl">Add URL image: </label>
					<input
						id="imageUrl"
						name="imageUrl"
						type="url"
						placeholder="https://example.com"
						value={input.urlImage}
						onChange={(e) =>
							handleAddImage(e, urlImage, setUrlImage, validateUrl)
						}
					/>
					<button
						disabled={urlError.length && true}
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

			{errors.images && <p>{errors.images}</p>}
		</div>
	);
}
