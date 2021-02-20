import React, {useState} from "react";
import { IconButton, AppBar, Toolbar, Grid, Menu, MenuItem} from "@material-ui/core";
import {AccountCircle, Notifications} from "@material-ui/icons";

import SearchField from "./Search";

function TopBar(mainProps){
        // states for displayable menus
        const [anchorEl, setAnchorEl] = useState(null);
        const isMenuOpen = Boolean(anchorEl);

        const handleMenuOpen = (event) => {
            setAnchorEl(event.target);
        }
        const handleMenuClosed = (props) => {
            setAnchorEl(null);
        }
        const renderMenu = (
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={handleMenuClosed}
            >
              <MenuItem onClick={handleMenuClosed}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClosed}>My account</MenuItem>
            </Menu>
          );

        return(
            <div>
                <AppBar position="sticky" color="secondary">
                    <Toolbar variant="dense">
                        <Grid container className="center"
                        >
                            <Grid item xs={2}>
                                <h1 className="text">WorldNow</h1>
                            </Grid>

                            <Grid item xs={8} className="center">
                                <SearchField sendData={mainProps.sendData}/>
                            </Grid>

                            <Grid item xs={2}>

                                <IconButton onClick={handleMenuOpen}>
                                    <Notifications/>
                                </IconButton>

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