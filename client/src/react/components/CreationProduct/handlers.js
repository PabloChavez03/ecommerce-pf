/** input.images handlers */
export const handleShowAddingImage = (e, canAddImage, setCanAddImage) => {
	e.preventDefault();
	setCanAddImage(!canAddImage);
};

export const handleAddImage = (e, urlImage, setUrlImage, validateUrl) => {
	const { value } = e.target;
	e.preventDefault();
	setUrlImage(value);
	validateUrl(urlImage);
};

export const handleSubmitAddImage = (
	e,
	input,
	setInput,
	setError,
	validate,
	urlImage,
	setCanAddImage,
) => {
	e.preventDefault();

	const regex = /^(https:\/\/|http:\/\/|www\.)/gm;

	setInput({
		...input,
		images: [...input.images, urlImage.replace(regex, "")],
	});
	setError(
		validate({
			...input,
			images: [...input.images, urlImage.replace(regex, "")],
		}),
	);
	setCanAddImage(false);
};

export const handleDeleteImg = (e, elClicked, input, setInput) => {
	e.preventDefault();
	setInput({
		...input,
		images: input.images.filter((el) => el !== elClicked),
	});
};

/** input.info handlers */
export const handleChangeMoreInfo = (e, moreInfo, setMoreInfo) => {
	const { name, value } = e.target;
	e.preventDefault();
	setMoreInfo({
		...moreInfo,
		[name]: value,
	});
};

export const handleSubmitInfo = (
	e,
	moreInfo,
	setMoreInfo,
	input,
	setInput,
	setAddMoreInfo,
) => {
	e.preventDefault();
	setInput({
		...input,
		info: { ...input.info, ...moreInfo },
	});

	setMoreInfo({
		aboutMe: "",
		sizeAndFit: "",
		careInfo: "",
	});

	setAddMoreInfo(false);
};

/** input.variants handlers */
export const handleSizeChange = (e, size, setSize, input) => {
	const { value } = e.target;
	e.preventDefault();
	setSize({
		brandSize: value,
	});
};

export const handleSubmitAddSize = (
	e,
	input,
	setInput,
	size,
	setSize,
	setCanAddVariant,
) => {
	e.preventDefault();
	setInput({
		...input,
		variants: [...input.variants, size],
	});
	setCanAddVariant(false);
};

export const handleSizeDelete = (e, elClicked, input, setInput) => {
	e.preventDefault();
	setInput({
		...input,
		variants: input.variants.filter((el) => el !== elClicked),
	});
};
