import React from "react";

import Home from '../../pages/Home'
import About from '../../pages/About'
import NotFound from '../../pages/NotFound'

import {Switch, BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

const Routing = () => {
    return (<Router>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Switch>
            <Route exact path={'/about'} component={About}/>
            <Route path={'/404'} component={NotFound}/>
            <Route exact path={'/'} component={Home}/>
            <Redirect to={'/404'} />
        </Switch>
    </Router>)
}
export default Routing
