const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			invoices: []			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				// getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				// try{
				// 	// fetching data from the backend
				// 	const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
				// 	const data = await resp.json()
				// 	setStore({ message: data.message })
				// 	// don't forget to return something, that is how the async resolves
				// 	return data;
				// }catch(error){
				// 	console.log("Error loading message from backend", error)
				// }
			},

			signUp: async (user_email, user_password) => {
				const options = {
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: user_email,
						password: user_password
					})
				}
			
				const response = await fetch(`${process.env.BACKEND_URL}api/signup`, options)
					
				if (!response.ok) {
					const data = await response.json();
					setStore({message: data.msg});
					// console.log('error: ', response.status, response.statusText);
					return {error: {status: response.status, statusText: response.statusText}};
				}
				
				const data = await response.json();
				setStore({message: data.msg});
				return data;
			}
		}
	};
};


export default getState;
