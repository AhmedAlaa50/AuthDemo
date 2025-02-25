import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import CryptoJS from "crypto-js";
import { User, AuthContextType } from "../types/user";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token); // Save token for authentication
      }
      const user = data.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };
  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          createdAt: new Date().toISOString(),
        }),
      });
      //

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();

      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        password: CryptoJS.SHA256(password).toString(),
        username: username,
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
