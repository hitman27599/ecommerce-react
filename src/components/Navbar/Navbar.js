import React from 'react';
import  {AppBar , Toolbar ,IconButton ,Badge ,MenuItem ,Menu ,Typography} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import {Link,useLocation} from 'react-router-dom';
import logo from '../../assets/chesslogo.jpeg';

import useStyles from './styles';

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
            <AppBar position="fixed" className={classes.appbar} color="inherit" >
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src ={logo} alt ="chessbiz" height="25px" className={classes.image} />
                        ChessBiz
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>)}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
