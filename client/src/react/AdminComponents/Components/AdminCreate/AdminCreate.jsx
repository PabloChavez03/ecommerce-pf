import React, { useState } from "react";
import style from "./AdminCreate.module.css";

const AdminCreate = () => {
	const [activeCreate, setActiveCreate] = useState(false);

	const [newAdmin, setNewAdmin] = useState({
		user_name: "",
		legajo_user: "",
		rol: "",
		user_password: "",
		confirm_user_password: "",
		
	});

	const [error, setError] = useState({
		user_name: "",
		legajo_user: "",
		rol: "",
		user_password: "",
		confirm_user_password: "",
		submit: "",
	  });

	  

	function validate(input) {
		let errors = {};
	
		if (input.user_name.length <= 4) {
			errors.user_name = "Debe ingresar un nombre";
		}else{errors.user_name = 'good'}
		if (input.legajo_user.length <= 6) {
			errors.legajo_user = "Debe ingresar un legajo!";
		}else{errors.legajo_user = 'good'}
		if (input.rol.length <= 3) {
			errors.rol = "Debe ingresar un legajo!";
		}else{errors.rol = 'good'}
		if (input.user_password.length <= 3 || input.user_password !== input.confirm_user_password) {
			errors.user_password = "Debe ingresar una contraseña!";
		}else{errors.user_password = 'good'}

		if(errors.user_name=== 'good' && errors.legajo_user=== 'good' && errors.rol=== 'good' && errors.user_password=== 'good' ){
			errors.submit = 'we good'
		}
		return errors
		
	}

	const handleChangeInputNewAdmin = (e) => {
		e.preventDefault();
		setNewAdmin({
			...newAdmin,
			[e.target.name]: e.target.value,
		});
		setError(
			validate({
			  ...newAdmin,
			  [e.target.name]: e.target.value,
			}
		));
	};
	const handleSubmit= (e)=>{ 
		e.preventDefault();
		console.log(newAdmin)
		if(error.submit !== 'we good'){return}
		alert('sumitie')
	}

	const handleChangeActive = (e) => {
		e.preventDefault();
		if (activeCreate) {
			setActiveCreate(false);
		} else {
			setActiveCreate(true);
		}
	};

	return (
		<>
			<div className={style.loginContainer}>


				
				{/**Creando usuario */}
				<div className={style.formCreateUser}>
					<form onSubmit={(e) => handleSubmit(e)}>
					{activeCreate ? (
						<div className={style.formCreateActive}>
							<h2 className={style.formTitle}>Crear Cuenta Admin</h2>
							{/* <form> */}
								
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>CONTRASEÑA</label>
									<input
										className={error.user_password !== 'good' ?  style.error : style.formInput}
										type='password'
										name='user_password'
										value={newAdmin.user_password}
										placeholder='Contraseña'
										onChange={(e) => handleChangeInputNewAdmin(e)}
									/>
								</div>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>
										CONFIRMAR CONTRASEÑA
									</label>
									<input
										className={style.formInput}
										name='confirm_user_password'
										value={newAdmin.confirm_user_password}
										type='password'
										placeholder='Repetir contraseña'
										onChange={(e) => handleChangeInputNewAdmin(e)}
									/>
								</div>
								<button
									className={style.formButtonCreateActive}
									
								>
									CREAR
								</button>
								<button
									className={style.formButtonBack}
									onClick={handleChangeActive}
								>
									VOLVER
								</button>
							{/* </form> */}
						</div>
					) : (
						<div className={style.formCreateNotActive}>
							<h2>Crear Cuenta Admin</h2>
							<div className={style.formInputContainer}>
									<label className={style.formLabel}>USER NAME</label>
									<input
										className={error.user_name === 'good' ?  style.noError : style.formInput}
										type='text'
										name='user_name'
										value={newAdmin.user_name}
										placeholder='User Name'
										onChange={(e) => handleChangeInputNewAdmin(e)}
									/>
								</div>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>LEGAJO</label>
									<input
										className={style.formInput}
										type='number'
										name='legajo_user'
										value={newAdmin.legajo_user}
										placeholder='Legajo'
										onChange={(e) => handleChangeInputNewAdmin(e)}
									/>
								</div>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>ROL</label>
									<input
										className={style.formInput}
										type='text'
										name='rol'
										value={newAdmin.rol}
										placeholder='Rol'
										onChange={(e) => handleChangeInputNewAdmin(e)}
									/>
								</div>
							<button
								className={style.formButtonCreateActive}
								onClick={handleChangeActive}
							>
								CONTINUAR
							</button>
						</div>
					)}
					</form>
				</div>
			</div>
		</>
	);
};

export default AdminCreate;
