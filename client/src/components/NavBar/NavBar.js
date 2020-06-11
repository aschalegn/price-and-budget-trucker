import React, { useState, useContext, Fragment } from 'react';
import "./NavBar.css";
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeAfterLogIn from "../afterlogin/Home/HomeAfterLogIn";
import HomeBeforLogin from "../beforelogin/HomeBeforLogin";
import About from '../About/About';
import Trackers from '../afterlogin/tracker/Trackers';
import Page404 from '../Page404';
import { isLogedInContext } from '../../contexts/isLogedInContext';
import Login from '../beforelogin/Login';
import Signin from '../beforelogin/Signin';
import { ThemeContext } from '../../contexts/ThemeContext';

const NavBar = props => {
    const [smallScreen, setsmallScreen] = useState(false);
    const { userStatus, userDispatch } = useContext(isLogedInContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    let mainstyle = {}

    {
        theme.isDark ?
            mainstyle = {
                backgroundColor: theme.dark.background, color: theme.dark.color
                , navstyle: { backgroundColor: theme.dark.navBackground }
            }
            :
            mainstyle = {
                backgroundColor: theme.light.background, color: theme.light.color
                , navstyle: { backgroundColor: theme.light.navBackground }
            }
    }

    return (
        <BrowserRouter>
            <nav className="NavBar" style={mainstyle.navstyle}>
                <h2><Link to="/"> <i>W</i>ise<i>E</i>conomy </Link></h2>
                <section className="navShowHide" onClick={() => setsmallScreen(!smallScreen)}>
                    <div className="navPoint"></div>
                    <div className="navPoint"></div>
                    <div className="navPoint"></div>
                </section>

                <ul >
                    {userStatus.isLogegedIn ?
                        <Fragment>
                            <li> <Link to="/">Home</Link> </li>
                            <li> <Link to="/about">About</Link> </li>
                            <li> <Link to="/tracker">Track Price</Link> </li>
                            <li onClick={() => {
                                localStorage.removeItem('wiseUser');
                                userDispatch({type:"LOGOUT_USER"})
                            }}>
                                <Link to="/">Log Out</Link> </li>
                        </Fragment>
                        :
                        <Fragment>
                            <li> <Link to="/">Home</Link> </li>
                            <li> <Link to="/about">About</Link> </li>
                            <li> <Link to="/login">Login</Link> </li>
                            <li> <Link to="/signin">Signin</Link> </li>
                        </Fragment>
                    }
                </ul>
                <input type="checkbox" className="themeToggler" defaultChecked={theme.isDark} onClick={(e) => {
                    toggleTheme(e.target.checked);
                }} />
            </nav>
            <main style={mainstyle}>
                <Switch>
                    {userStatus.isLogegedIn ?
                        <Fragment>
                            <Route exact path="/" component={HomeAfterLogIn} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/tracker" component={Trackers} />
                        </Fragment>
                        :
                        <Fragment>
                            <Route exact path="/" component={HomeBeforLogin} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signin" component={Signin} />
                        </Fragment>
                    }
                    <Route exact path="/*" component={Page404} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default NavBar;