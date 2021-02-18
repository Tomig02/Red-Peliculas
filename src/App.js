import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import {ThemeProvider, Button} from "@material-ui/core"
import Theme from "./theme";

import "./App.css";
import Register from "./Components/Register/Register"

function App() {

    const [userInfo, setUserInfo] = useState({});
    const [isUser, setIsUser] = useState(false);

    //save user data and admit login route
    const logInUser = (fetchData) => {
        console.log("hello");
        setUserInfo(fetchData);
        setIsUser(true);
        console.log(fetchData);
    }

    const LandingPage = () => <Landing logInUser={logInUser}/>
    return (
        <ThemeProvider theme={Theme}>
            <Router>
                <Switch>
                    <Route path="/" exact component={LandingPage}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/Inside" component={Register}/>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
