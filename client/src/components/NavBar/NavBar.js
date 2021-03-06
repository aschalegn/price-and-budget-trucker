import React, { useState, useContext, Fragment } from 'react';
import "./NavBar.css";
import { Link, BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { userContext } from '../../contexts/userContext';
import HomeAfterLogIn from "../afterlogin/Home/HomeAfterLogIn";
import HomeBeforLogin from "../beforelogin";
import About from '../About';
import Trackers from '../afterlogin/tracker/Trackers';
import Page404 from '../Page404';
import Login from '../beforelogin/Login';
import { ThemeContext } from '../../contexts/ThemeContext';
import SignUp from '../beforelogin/SignUp';

const NavBar = () => {
    const [smallScreen, setsmallScreen] = useState(false);
    const { userStatus, userDispatch } = useContext(userContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    let mainstyle = {}

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

    return (
        <BrowserRouter>
            <header>
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
                                    userDispatch({ type: "LOGOUT_USER" })
                                }}>
                                    <Link to="/">Log Out</Link> </li>
                            </Fragment>
                            :
                            <Fragment>
                                <li> <Link to="/">Home</Link> </li>
                                <li> <Link to="/about">About</Link> </li>
                                <li> <Link to="/login">Login</Link> </li>
                                <li> <Link to="/signup">SignUp</Link> </li>
                            </Fragment>
                        }
                    </ul>
                    <input type="checkbox" className="themeToggler" defaultChecked={theme.isDark} onClick={(e) => {
                        toggleTheme(e.target.checked);
                    }} />
                </nav>
            </header>
            <main style={mainstyle}>
                <Switch>
                    {userStatus.isLogegedIn ?
                        <Fragment>
                            <Route exact path="/" component={HomeAfterLogIn} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/tracker" component={Trackers} />
                            <Route exact path="/*" component={Page404} />
                            {/* <Redirect to="/404" /> */}
                        </Fragment>
                        :
                        <Fragment>
                            <Route exact path="/" component={HomeBeforLogin} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={SignUp} />
                            {/* <Redirect to="/404" /> */}
                            {/* <Route component={Page404} /> */}
                        </Fragment>
                    }
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default NavBar;