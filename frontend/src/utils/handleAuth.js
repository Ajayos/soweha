const { TOKEN_KEY, AUTH_NAME, AUTH_ID, AUTH_PIC } = require("../config");

export const isAuthenticated = () =>
	Boolean(localStorage.getItem(TOKEN_KEY) !== null);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserData = () => {
	const username = localStorage.getItem(AUTH_NAME);
	const id = localStorage.getItem(AUTH_ID);
	const pic = localStorage.getItem(AUTH_PIC);
	return { username, id, pic };
};

export const login = (token, name, id, pic) => {
	localStorage.setItem(TOKEN_KEY, token);
	localStorage.setItem(AUTH_NAME, name);
	localStorage.setItem(AUTH_ID, id);
	localStorage.setItem(AUTH_PIC, pic);
};

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(AUTH_NAME);
	localStorage.removeItem(AUTH_ID);
	localStorage.removeItem(AUTH_PIC);
	localStorage.clear();
	window.location.href = "/login";
};
