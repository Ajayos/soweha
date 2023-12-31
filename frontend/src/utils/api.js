import axios from "axios";
import { BACKEND_URL, TOKEN_KEY } from "../config";

const api = axios.create({
	baseURL: BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const token = localStorage.getItem(TOKEN_KEY);
if (token) {
	api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}


export default api;