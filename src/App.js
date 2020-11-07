import logo from './logo.svg';
import React from "react";
import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom";
import Login from "./pages/auth/Login";
import Admin from "./pages/Admin";
import Register from "./pages/auth/Register";
import {authManager} from "./utils/AuthManager";
import Toast from "./components/Toast";
require('dotenv').config();

const style={
    root:{
        height:'100%'
    }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authManager.isAuthenticate() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

function App() {
  return (
    <div style={style.root}>
        <Toast/>
      <Switch>
          <Route exact={true} path={"/"} component={Login}/>
          {/*<Route exact={true} path={"/app"} component={Admin}/>*/}
          <PrivateRoute  path={"/app"} component={Admin}/>
          <Route exact={true} path={"/register"} component={Register}/>
      </Switch>
    </div>
  );
}

export default App;
