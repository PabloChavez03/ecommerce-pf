import { useState } from "react";

import CreateIcon from "../../svg/CreateIcon";
import { handleSizeChange, handleSubmitAddSize } from "../handlers";

function AddVariants({ input, setInput }) {
	const [canAddVariant, setCanAddVariant] = useState(false);
	const [size, setSize] = useState({
		brandSize: "",
	});

	return (
		<div>
			<label>Add variant:</label>
			<span onClick={(e) => setCanAddVariant(!canAddVariant)}>
				<CreateIcon />
			</span>

			{canAddVariant ? (
				<div>
					<label htmlFor="size">Add size: </label>
					<input
						type="text"
						id="size"
						name="size"
						onChange={(e) => handleSizeChange(e, size, setSize, input)}
					/>

					<button
						// disabled={urlError.length && true}
						onClick={(e) =>
							handleSubmitAddSize(
								e,
								input,
								setInput,
								size,
								setSize,
								setCanAddVariant,
							)
						}
					>
						Add
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default AddVariants;
