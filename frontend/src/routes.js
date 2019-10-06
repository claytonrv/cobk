import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';



import Login from './pages/login';
import Dashboard from './pages/dashboard';

export default function routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}