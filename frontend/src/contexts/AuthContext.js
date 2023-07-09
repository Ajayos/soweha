import { useState, createContext, useEffect } from "react";
 import {
 	getToken,
 	getUserData,
// 	logout,
 } from "../utils/handleAuth";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    username: "",
    pic: "",
  });
  // eslint-disable-next-line
  const [MyToken, setMyToken] = useState(undefined);

   useEffect(() => {
   	const myToken = getToken();
   	if (myToken && myToken !== undefined) {
   		setIsAuthenticated(true);
   		setMyToken(myToken);
   		setUser(getUserData());
   	}
   }, [setIsAuthenticated, setUser]);

  // async function SignIn(email, password) {
  // 	return await API.post("/users/login", { email, password });
  // }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
