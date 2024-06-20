const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			signupMessage: null,
			isSignUpSuccessful: false,
			isLoginSuccessful: false,
			loginMessage: null,
			invoiceMessage: null,
			invoices: [],
			message: null			
		},
		actions: {
			// // Use getActions to call a function within a fuction
			//  exampleFunction: () => {
			// // 	// getActions().changeColor(0, "green");
			//  },

			//  getMessage: async () => {
			// // 	// try{
			// // 	// 	// fetching data from the backend
			// // 	// 	const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// // 	// 	const data = await resp.json()
			// // 	// 	setStore({ message: data.message })
			// // 	// 	// don't forget to return something, that is how the async resolves
			// // 	// 	return data;
			// // 	// }catch(error){
			// // 	// 	console.log("Error loading message from backend", error)
			//  	// }
			//  },

			syncTokenFromSessionStore: () => {
				const sessionToken =sessionStorage.getItem('token');
				console.log("Application just loaded. Syncing the sessionStorage token.")
				if (sessionToken && sessionToken !== "" && sessionToken !== undefined) {
					setStore({token: sessionToken})
				}
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
					setStore({signupMessage: data.msg});
					// console.log('error: ', response.status, response.statusText);
					return {error: {status: response.status, statusText: response.statusText}};
				}
				
				const data = await response.json();
				setStore({
					signupMessage: data.msg,
					isSignUpSuccessful: response.ok
				})
				return data;
			},

			login: async (userEmail, userPassword) => {
				const options = {
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: userEmail,
						password: userPassword
					}),
				}
		
				
					const response = await fetch(`${process.env.BACKEND_URL}api/token`, options);
				
					if (!response.ok) {
						const data = await response.json();
						setStore({loginMessage: data.msg});
					  return {error: {status: response.status, statusText: response.statusText}};
					}
				
					const data = await response.json();
					sessionStorage.setItem("token", data.access_token);
					setStore({ 
						loginMessage: data.msg,
						token: data.access_token,
						isLoginSuccessful: true 
					});
				
					console.log("Login successful. Token:", data.access_token);
					return true;  
			}, 

			// logout allows removal of the token fro the store
			// and sessionStorage
			logout: () => {
				sessionStorage.removeItem('token')
				setStore({
					token: null,
					signupMessage: null,
					isSignUpSuccessful: false,
					isLoginSuccessful: false,
					loginMessage: null,
					invoiceMessage: null,
					invoices: [],
				})
				console.log("You've logged out.")
			},

			getInvoices: async () => {
				const store = getStore()
				const options = {
					method: 'GET',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${store.token}`
					},
				}
			
				const response = await fetch(`${process.env.BACKEND_URL}api/invoices`, options)
					
				if (!response.ok) {
					// console.log('error: ', response.status, response.statusText);
					return {error: {status: response.status, statusText: response.statusText}};
				}
				
				const data = await response.json();
				setStore({
					invoices: data.invoices,
					invoiceMessage: data.msg
				})
				console.log(data.msg, data.invoices)
				return data;
			}

		}
	};
};


export default getState;
