import React, { useState, useContext, Fragment } from 'react';
import "./css/NavBar.css";
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeAfterLogIn from "./afterlogin/HomeAfterLogIn";
import HomeBeforLogin from "./beforelogin/HomeBeforLogin";
import About from './About';
import Tracker from './afterlogin/Tracker';
import Page404 from './Page404';
import { isLogedInContext } from '../contexts/isLogedInContext';
import Login from './beforelogin/Login';
import Signin from './beforelogin/Signin';

const NavBar = props => {
    const [smallScreen, setsmallScreen] = useState(false);
    const { userStatus } = useContext(isLogedInContext);

    return (
        <BrowserRouter>
            <nav className="NavBar">
                <h2><Link to="/"> <i>W</i>ise<i>E</i>conomy </Link></h2>
                <section className="navShowHide" onClick={() => setsmallScreen(!smallScreen)}>
                    <div className="navPoint"></div>
                    <div className="navPoint"></div>
                    <div className="navPoint"></div>
                </section>

                <ul>
                    {userStatus.isLogegedIn ?
                        <Fragment>
                            <li> <Link to="/">Home</Link> </li>
                            <li> <Link to="/about">About</Link> </li>
                            <li> <Link to="/tracker">Track Price</Link> </li>
                            <li onClick={() => {
                                localStorage.clear();
                                document.cookie = ''
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
            </nav>
            <Switch>
                {userStatus.isLogegedIn ?
                    <Fragment>
                        <Route exact path="/" component={HomeAfterLogIn} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/tracker" component={Tracker} />

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
        </BrowserRouter>
    )
}

export default NavBar;