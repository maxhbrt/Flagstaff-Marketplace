import React from 'react';
import { Switch, Route} from "react-router-dom";
import Find from "./components/Map/Map";
import Register from "./components/Register/Register";
import Landing from './components/Landing/Landing';
import Shop from './components/Shop/Shop';
import Logout from './components/Logout/logout';
import Login from './components/Login/Login';
import Cart from './components/Cart/cart';


export default (
    <Switch>
        <Route component={Landing} exact path="/"/>
        <Route component={Find} path="/map"/>
        <Route component={Register} path="/register"/>
        <Route component={Shop} path="/shop"/>
        <Route component={Logout} path="/logout"/>
        <Route component={Login} path="/login"/>
        <Route component={Cart} path="/cart"/>

    </Switch>
)