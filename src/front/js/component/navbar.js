import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.token ?
					<button
					className="btn btn-primary"
					onClick={() => actions.logout()}
					>Log Out</button>
					:
					<Link to="/login">
						<button className="btn btn-primary">Log in</button>
					</Link>
				
				}
					<Link to="/signup">
						<button className="btn btn-primary">Sign Up</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
