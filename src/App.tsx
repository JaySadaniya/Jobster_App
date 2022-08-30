import {
  FC,
  lazy,
  useMemo,
  useEffect,
  Suspense,
  ReactNode,
  useState,
} from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Auth from "./services/Auth";
import { makeServer } from "./mirage";
import Loader from "./components/ui/loader/Loader";
import { ToastProvider } from "./context/ToastProvider";
import { AuthProvider } from "./context/AuthProvider";
import Dashboard from "./pages/Dashboard";
import { useAuthContext } from "./context/AuthProvider";
import All_Jobs from "./pages/All_Jobs";
import Add_Job from "./pages/Add_Job";
import Edit_Job from "./pages/Edit_Job";
import Profile from "./pages/Profile";

const Landing = lazy(() => import("./pages/Landing"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

const PrivateRoute: FC<{
  children: ReactNode;
  path: string;
}> = ({ children, ...rest }) => {
  const token = Auth.getToken();

  return token ? <Route {...rest}>{children}</Route> : <Redirect to="/login" />;

  // return (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       token ? <Component {...props} /> : <Redirect to="/login" />
  //     }
  //   />
  // );
};

function App() {
  // const server = useMemo(() => makeServer(), []);
  // console.log("server: ", server);
  const [firstTime, setFirstTime] = useState<boolean>(true);
  // const { loaded } = useAuthContext();

  if (firstTime) {
    setFirstTime(false);
    makeServer();
  }

  // useEffect(() => {
  //   makeServer();
  // }, []);

  const fallbackLoader = () => {
    return (
      <div className="flex h-screen justify-center">
        <Loader message="Loading page" />
      </div>
    );
  };

  return (
    <div className="bg-brand-50">
      <Suspense fallback={fallbackLoader()}>
        <ToastProvider>
          <AuthProvider>
            <Switch>
              <Route path="/landing">
                <Landing />
              </Route>

              <Route path="/register">
                <Register />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <PrivateRoute path="/all-jobs">
                <All_Jobs />
              </PrivateRoute>

              <PrivateRoute path="/add-job">
                <Add_Job />
              </PrivateRoute>

              <PrivateRoute path="/edit-job/:jobId">
                <Edit_Job />
              </PrivateRoute>

              <PrivateRoute path="/profile">
                <Profile />
              </PrivateRoute>

              <PrivateRoute path="/">
                <Dashboard />
              </PrivateRoute>

              <Redirect to="/landing" />
            </Switch>
          </AuthProvider>
        </ToastProvider>
      </Suspense>
    </div>
  );
}

export default App;
