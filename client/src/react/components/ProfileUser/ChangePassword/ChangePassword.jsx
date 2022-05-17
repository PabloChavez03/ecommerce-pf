import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./ChangePassword.module.css";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


import { loggedOut, updateUserInfo, UserLogin } from "../../../../redux/actions-types";

export default function ChangePassword() {
	const dispatch = useDispatch();
    const navigate = useNavigate();

	const userData = useSelector((state) => state.userData);
	const [user, setUser] = useState({
		
	});

	useEffect(() => {
		setUser({
			
            newPassword:'',
            confirmNewPassword:''
		});
	}, []);

	const isThereChanges =
		userData.password !== user.prevPassword ||
		userData.password === user.newPassword ||
        user.newPassword === ''||
        user.newPassword.length < 4 ||
		user.newPassword !== user.confirmNewPassword
		
			? false
			: true;

	const handleChange = (e) => {
		e.preventDefault();
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
		// setError(
		// 	validate({
		// 	  ...user,
		// 	  [e.target.name]: e.target.value,
		// 	}
		// ));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
        let theUser = {
            username: userData.username,
			dni: userData.dni,
			email: userData.email,
			address: userData.address,
			name: userData.name,
			lastname: userData.lastname,
			phone: userData.phone,
            password: user.newPassword
        }
		dispatch(updateUserInfo(userData.username, userData.token, theUser));
		Swal.fire(
			'Cambios guardados!',
			'',
			'success'
		  )
		dispatch(loggedOut());
		dispatch(
			UserLogin({
				user_name: userData.username,
				user_password: user.newPassword,
			}),
		);
       setTimeout(()=>{navigate('/')}, 1500)
	};

    
	

	return (
		<>
			<div className={style.profileUserContainer}>
				<h1 className={style.titulo}>Cambiar Contraseña</h1>

				<div className={style.sections}>
					<fieldset className={style.section}>
						<legend>Usuario: <b>{userData.username}</b></legend>
						{/* <div className={style.infoContainer}>
							<label htmlFor="username">Nombre de usuario:</label>
							<input
								className={style.input}
								id="username"
								name="username"
								type="text"
								value={!user.username ? "" : user.username}
								readOnly
							/>
						</div> */}
						
						<div className={style.infoContainer}>
							<label htmlFor="username">Contraseña actual:</label>
							<input
								className={style.input}
								id="prevPassword"
								name="prevPassword"
								type="password"
                                value={user.prevPassword}
								onChange={(e)=>handleChange(e)}								
							/>
						</div>
						<div className={style.infoContainer}>
							<label htmlFor="username">Nueva contraseña:</label>
							<input
								className={style.input}
								id="newPassword"
								name="newPassword"
								type="password"
								value={user.newPassword}
								onChange={(e)=>handleChange(e)}
							/>
						</div>
						<div className={style.infoContainer}>
							<label htmlFor="username">Confirme nueva contraseña:</label>
							<input
								className={style.input}
								id="confirmNewPassword"
								name="confirmNewPassword"
								type="password"
								value={user.confirmNewPassword}
								onChange={(e)=>handleChange(e)}
							/>
						</div>
						
						
					</fieldset>
					
				</div>
				<button className={style.button} disabled={!isThereChanges} onClick={(e) => handleSubmit(e)}>
					Guardar cambios
				</button>
			</div>
		</>
	);
}

// !address: null
// !dni: null
// !email: null
// isRegistered: true
// !lastname: null
// legajo: "312312"
// !name: null
// password: "321"
// !phone: null
// rol: "client"
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiMDMzZWI4ODQtNDA1OS00NTUzLWJhNDktZWNlYzQxNTg3NTE4IiwidXNlcm5hbWUiOiJjYiIsImlhdCI6MTY1MTk5MDU1NX0.FixRY6TSOSL4lbxLoAR8qsvh0zy3mNrm5YYp6Vn1MBY"
// username: "cb"
