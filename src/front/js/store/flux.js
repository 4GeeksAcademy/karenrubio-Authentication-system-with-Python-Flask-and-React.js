const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false,
			currentUser: "",
			apiUrl: `${process.env.BACKEND_URL}/api`,
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			signup: async (user) => {
				const store = getStore();
				const actions = getActions();
				try { 
					console.log(store.apiUrl);
					const response = await fetch(`${store.apiUrl}/signup`, {
						method: 'POST',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*'
						}
					});
					console.log(response);
					const data = await response.json();
					if (response.ok) {
						console.log(data);
						return true;
					}
			
					return false;
				} catch (error) { 
					console.log(error);
					return false;
				}
			},
			login : async (user) => {
				const store = getStore();
				const actions = getActions();
				try {
					console.log(store.apiUrl);
					const response = await fetch(`${store.apiUrl}/login`, {
						method: 'POST',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*'
						}
					});
					console.log(response);
					const data = await response.json();
					if (response.ok) {
						console.log(data);
					setStore({ auth: true });
					console.log('auth',store.auth)
						
						localStorage.setItem('token', data.access_token);
						return true;
					}
					return false;
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			getProfile : async () => {
				try {
					const store = getStore();
					const token = localStorage.getItem('token');
					if (!token) {
						console.error('No token found in localStorage');
						return null;
					}
			
					const response = await fetch(`${store.apiUrl}/private`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						}
					});
			
					console.log(response); 
			
					if (response.status === 401) {
						console.error('Unauthorized: User not authenticated');
						return null;
					}
			
					if (response.status === 403) {
						console.error('Forbidden: User does not have access');
						return null;
					}
			
					if (!response.ok) {
						
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
			
					const data = await response.json();
					console.log(data); 
			
					return data;
				} catch (error) {
					console.error('Error fetching profile:', error);
					return null;
				}
			},
			
			isAuth: async() =>{
				const store = getStore()
				try {
					const response = await fetch(`${store.apiUrl}/isauth`,{
						method: 'GET',
						headers: {
							'Content-Type': 'aplication/json',
							'Autorization': `Bearer ${store.currentUser.access_token}`
						}
						

					})
					console.log(response)
					if(response.ok){
						return true
					}else{
						return false 
					}
					
				} catch (error) {
					return false
					
				}

			},

			logout: () => {
				const store = getStore();
				localStorage.removeItem("token")
				setStore({ auth: false });
					console.log('auth',store.auth)
				



			},
		}
	};
};

export default getState;
