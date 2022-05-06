import { useState } from "react";

import CreateIcon from "../../svg/CreateIcon";
import { handleSizeChange, handleStockChange, handleSubmitAddSize } from "../handlers";
import s from "./AddVariants.module.css";

function AddVariants({ input, setInput }) {
	const [canAddVariant, setCanAddVariant] = useState(false);
	const [variants, setVariants] = useState({
		brandSize: "",
		isInStock: false,
		stock: 0
	});

	const handleStockChange = (e) => {
		e.preventDefault();
		setVariants({
			...variants,
			stock: e.target.value
		});
	};

	const handleSizeChange = (e) => {
		e.preventDefault();
		setVariants({
			...variants,
			brandSize: e.target.value
		});
	};

	const handleIsInStockChange = (e) => {
		setVariants({
			...variants,
			isInStock: !variants.isInStock,
		});
	};
	return (
		<div className={s.container}>
			<label>Agregar variantes:</label>
			<span onClick={(e) => setCanAddVariant(!canAddVariant)}>
				<CreateIcon />
			</span>

			{canAddVariant ? (
				<div className={s.addVariantsContainer}>
					<label htmlFor="size">Talle: </label>
					<input
						className={s.input}
						type="text"
						id="size"
						name="size"
						onChange={(e) => handleSizeChange(e, variants.size, setVariants, input)}
					/>
					<label htmlFor="size">El producto se encuentra en stock?</label>
					<input 
					className={s.input}
					type="checkbox"
					name="isInStock"
					value={variants.isInStock}
					onChange={(e) => handleIsInStockChange(e)}
					/>
					{
						variants.isInStock?
						<div>
						<label htmlFor="size">Stock:</label>
						<input
						className={s.input}
						type="number"
						id="stock"
						name="stock"
						value={variants.stock}
						onChange={(e) => handleStockChange(e)}
					/>
						</div>
						:""
					}
					
					<button
						// disabled={urlError.length && true}
						className={s.button}
						onClick={(e) =>
							handleSubmitAddSize(
								e,
								input,
								setInput,
								variants,
								setVariants,
								setCanAddVariant,
							)
						}
					>
						Agregar
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default AddVariants;
