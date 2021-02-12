import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import {ThemeProvider, Button} from "@material-ui/core"
import Theme from "./theme";

import "./App.css";
import Register from "./Components/Register/Register"

function App() {

    const [userInfo, setUserInfo] = useState({
        userName: "",
        name: "",
        surname: "",
        birthday:{
            day: "",
            month: "",
            year: ""
        }
    });
    const logInUser = (fetchData) => {
        console.log(fetchData);
    }
    const LandingPage = () => <Landing logInUser={logInUser}/>
    return (
        <ThemeProvider theme={Theme}>
            <Router>
                <Switch>
                    <Route path="/" exact component={LandingPage}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
