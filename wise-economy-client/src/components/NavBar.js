import React, { useState, useContext } from 'react';
import "./css/NavBar.css";
import { Link, BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./Home";
import About from './About';
import Tracker from './Tracker';
import Page404 from './Page404';
import { IsLogenInContext } from '../contexts/IsLogenInContext';

const NavBar = props => {
    const [smallScreen, setsmallScreen] = useState(false);
    const {isLogedIn} = useContext(IsLogenInContext);
    console.log(isLogedIn)
    return (
        <BrowserRouter>
            <nav className="NavBar">
                <h2><Link to="/"> <i>W</i>ise<i>E</i>conomy </Link></h2>
                <section className="navShowHide" onClick={() => setsmallScreen(!smallScreen)}>
                    <div className="navPoint"></div>
                    <div className="navPoint"></div>
                    <div className="navPoint"></div>
                </section>

                {!smallScreen ?
                    <ul>
                        <li> <Link to="/">Home</Link> </li>
                        <li> <Link to="/about">About</Link> </li>
                        <li> <Link to="/tracker">Track Price</Link> </li>
                    </ul>
                    : ''}

            </nav>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/tracker" component={Tracker} />
                <Route exact path="/*" component={Page404} />
            </Switch>
        </BrowserRouter>
    )
}

export default NavBar;