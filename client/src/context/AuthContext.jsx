import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading check

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));

    setLoading(false); // ✅ Initialization complete
  }, []);

  const login = (newToken, userObj) => {
    setToken(newToken);
    setUser(userObj);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userObj));
    if (userObj.referralCode) {
      localStorage.setItem("referralCode", userObj.referralCode);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
