import { useHistory } from "react-router-dom";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

import Auth from "../services/Auth";
import { IUser } from "../types/models/IUser";
import { IJob } from "../types/models/IJob";

type IAuthProvider = { children: ReactNode };
type IAuthContext = {
  user?: IUser;
  loaded?: boolean;
  setUser?: any;
  loadUserData?: any;
};

export const AuthContext = createContext<IAuthContext>({});

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const [loaded, setLoaded] = useState(false);

  const loadUserData = async () => {
    try {
      setLoaded(false);
      const token = Auth.getToken();
      if (!token) return;

      const user = await Auth.me();
      setUser(user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loaded, setUser, loadUserData }}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
