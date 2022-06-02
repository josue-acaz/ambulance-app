import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import api from "./api";

// contexts
import AuthGuard from "./contexts/auth/guards/auth.guard";
import AuthProvider from "./contexts/auth/auth.context";
import AuthContext from "./contexts/auth/auth.context";

// routes
import Routes from "./routes";

const Intercept: React.FC = (props) =>
{
  const authGuard = new AuthGuard();
  const authContext = new AuthContext(props);

  api.interceptors.request.use(async function (config) {
    // Do something before request is sent
    if(config.params)
    {
      if(!config.params.is_sign_in)
      {
        const authenticated = await authGuard.checkAuthentication();
        if(authenticated)
        {

        }
        else
        {
          authContext.signOut();
        }
      }
    }

      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
  });

  return <Routes />;
}

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <AuthProvider>
        <Routes />
        </AuthProvider>
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default App;
