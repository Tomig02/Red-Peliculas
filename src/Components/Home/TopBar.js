import React, {useState} from "react";
import { IconButton, AppBar, Toolbar, Grid, Menu, MenuItem} from "@material-ui/core";
import {AccountCircle, Notifications} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

import SearchField from "./Components/Search";

function TopBar(mainProps){
        // states for displayable menus
        const [anchorEl, setAnchorEl] = useState(null);
        const isMenuOpen = Boolean(anchorEl);
        const history = useHistory();

        const handleMenuOpen = (event) => setAnchorEl(event.target);
        const handleMenuClosed = () => setAnchorEl(null);

        const handleProfile = () => history.push("/profile");
        const handleLogOut = () => {
            localStorage.removeItem("userToken");
            mainProps.setIsLoggedIn(false);
        }
        const renderMenu = (
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={isMenuOpen}
              onClose={handleMenuClosed}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <hr/>
              <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
            </Menu>
          );

        return(
            <div>
                <AppBar position="fixed" color="secondary">
                    <Toolbar variant="dense">
                        <Grid container className="center"
                        >
                            <Grid item xs={2}>
                                <h1 className="text">WorldNow</h1>
                            </Grid>

                            <Grid item xs={8} className="center">
                                <SearchField searchByOption={mainProps.searchByOption}/>
                            </Grid>

                            <Grid item xs={2}>
                                <IconButton onClick={handleMenuOpen}>
                                    <AccountCircle/>
                                </IconButton>
                            </Grid>
                        </Grid>                
                    </Toolbar>
                </AppBar>
                {renderMenu}
            </div>
        );
}

export default TopBar;