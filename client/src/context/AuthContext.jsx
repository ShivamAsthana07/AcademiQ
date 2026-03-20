import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = still loading

  useEffect(() => {
    axios.get("/api/auth/me")
      .then(r => setUser(r.data.user || null))
      .catch(() => setUser(null));
  }, []);

  async function logout() {
    try {
      await axios.post("/api/auth/logout");
    } catch {
      // ignore
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}