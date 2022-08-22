import { useHistory } from "react-router-dom";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import Auth from "../services/Auth";
import { IUser } from "../types/models/IUser";
import { IJob } from "../types/models/IJob";

type IAuthProvider = { children: ReactNode };
type IAuthContext = {
  user?: IUser;
  loaded?: boolean;
  setUser?: any;
};

export const AuthContext = createContext<IAuthContext>({});

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const { push } = useHistory();

  const [user, setUser] = useState<IUser>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
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

    load();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loaded, setUser }}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
