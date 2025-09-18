import { useContext, createContext, useState, useEffect } from "react";

let AuthContext = createContext();

let AuthProvider = ({ children }) => {
  let [token, setToken] = useState(() => {
    return sessionStorage.getItem("token") || null;
  });
  let [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("user")) || null;
  });

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  let logout = () => {
    setToken(null);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

let useAuth = () => {
  return useContext(AuthContext);
};
export { AuthProvider, useAuth };
