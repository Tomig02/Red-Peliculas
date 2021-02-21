import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core"
import Theme from "./theme";

import "./App.css";
import Register from "./Components/Register/Register";
import Landing from "./Components/Landing/Landing";
import HomePage from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";


function App() {

    const [userInfo, setUserInfo] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    const HomePageNew = () => <HomePage userInfo={userInfo} setUserInfo={setUserInfo} setIsLoggedIn={setIsLoggedIn}/>
    const ProfilePage = () => <Profile userInfo={userInfo}/>
    return (
        <ThemeProvider theme={Theme}>
            <Router>
                <Switch>
                    <PrivateRoute path="/" exact component={HomePageNew}/>
                    <PrivateRoute path="/profile" component={ProfilePage}/>
                    <Route path="/signin" component={LandingPage}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
