/** Input.images handlers */
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
	setInput({
		...input,
		images: [...input.images, urlImage],
	});
	setError(
    validate({
      ...input,
      images: [...input.images, urlImage],
    })
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
