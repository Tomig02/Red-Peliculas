import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core"
import Theme from "./theme";

import "./App.css";
import Register from "./Components/Register/Register";
import Landing from "./Components/Landing/Landing";
import HomePage from "./Components/Home/Home";

function App() {

    
    const [userInfo, setUserInfo] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //save user data and create user token in local storage for later, then admit login route
    const logInUser = (fetchData) => {
        setUserInfo(fetchData);
        localStorage.setItem("userToken", fetchData._id)
        setIsLoggedIn(true);
    }

    const PrivateRoute = ({component: Component, ...rest}) => {
        return (
            <Route {...rest} render={props => (
                isLoggedIn 
                ? <Component {...props} />
                : <Redirect to="/signin" />
            )} />
        );
    };

    const LandingPage = () => <Landing setUserInfo={setUserInfo} setIsLoggedIn={setIsLoggedIn}/>
    const HomeSite = () => <HomePage userInfo={userInfo} setIsLoggedIn={setIsLoggedIn}/>
    return (
        <ThemeProvider theme={Theme}>
            <Router>
                <Switch>
                    <PrivateRoute path="/" exact component={HomeSite}/>
                    <Route path="/signin" component={LandingPage}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
