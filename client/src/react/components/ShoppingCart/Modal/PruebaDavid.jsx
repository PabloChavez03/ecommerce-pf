import React, { useState } from "react";
import Modal from "./Modal.jsx";

const PruebaDavid = () => {
	const [status, setStatus] = useState(false);

	const handleModalStatus = (e) => {
		e.preventDefault();
		setStatus(true);
	};
	return (
		<div>
			<div>
				<button onClick={(e) => handleModalStatus(e)}>Mostrar el modal</button>
				<Modal status={status} setStatus={setStatus} />
			</div>
		</div>
	);
};

export default PruebaDavid;
