import { useState, createContext } from "react";
// import {
// 	getToken,
// 	login,
// 	getUserData,
// 	getAccess,
// 	logout,
// } from "../utils/handleAuth";
// import API from "../utils/api";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  // const { enqueueSnackbar } = useSnackbar();
  // eslint-disable-next-line
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // eslint-disable-next-line
  const [user, setUser] = useState({
    name: "Ajay o s",
    email: "ajayos@gmail.com",
    status: "😍",
    pic: "https://github.com/Ajayos.png",
    online: true,
  });
  // eslint-disable-next-line
  const [MyToken, setMyToken] = useState("");
  // eslint-disable-next-line
  const [access, setAccess] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  // useEffect(() => {
  // 	const myToken = getToken();
  // 	if (myToken) {
  // 		setIsAuthenticated(true);
  // 		setMyToken(myToken);
  // 		setUser(getUserData());
  // 		setAccess(getAccess());
  // 	}
  // }, []);

  // async function SignIn(email, password) {
  // 	return await API.post("/users/login", { email, password });
  // }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        access,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
