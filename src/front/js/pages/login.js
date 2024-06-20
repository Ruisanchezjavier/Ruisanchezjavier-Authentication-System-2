// This page will accept a user's email and password
// Create a function in flux which will make a POST request with users info in body
// SUCCESS means:
// 1. The user is already registered and in the database
// 2. Response will include a msg stored in flux store from backend
// 3. Redirect user to /private page

// FAILURE means:
// 1. Response will return a msg stored in flux store
// 2. msg will be displayed on /login page telling the user that the email/password combo does not match
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context);
	// 1. create two UseStates, one for email the other for password
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let token = sessionStorage.getItem("token");

	// 3. create a function called handleClick that will include
	// the fetch with options that includes the email and password
	// in the body to be sent to the server as a POST
	const handleClick = async () => {
			actions.login(email, password)
		}

	useEffect(() => {
		if(store.isLoginSuccessful) {
			navigate("/private")
		}

	}, [store.isLoginSuccessful])

	// 2. make the <input> controlled inputs
	// also, make the button execute the handleClick function
	return (
		<div className="text-center mt-5">
			{(store.token && store.token !== "" && store.token !== undefined) ? (
			  <>
			    <h1>You are logged in</h1>
				<Link to="/private">
				<button>Go to your invoices</button>
				</Link>
			  </>
			):(
			<>
			<h1>Login</h1>
			<div>
                {store.signupMessage  || ""}
            </div>
			<div>
				<input 
					type="text" 
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<input 
					type="password" 
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div>
				<button onClick={handleClick}>Login</button>
			</div>
			</>
             )}
		</div>
	);
};
