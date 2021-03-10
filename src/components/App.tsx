import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Authentication from './authentication-modal/Authentication';
import HomeScreen from './home-screen/HomeScreen';
import AlbumScreen from './album-screen/AlbumScreen';
import '../assets/styles/App.scss';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import { Sidebar } from './sidebar/Sidebar';
import {
    GuardFunctionRouteProps,
    GuardToRoute,
    Next,
} from 'react-router-guards/dist/types';
import AuthenticationService from '../core/services/AuthenticationService';

const requireLogin = (
    to: GuardToRoute,
    from: GuardFunctionRouteProps | null,
    next: Next,
) => {
    if (to.meta.auth) {
        if (AuthenticationService.isAuthenticated()) {
            next();
        }
        next.redirect('/authenticate');
    } else {
        next();
    }
};
function Content(props: { children: JSX.Element }): JSX.Element {
    return <div className="container-content">{props.children}</div>;
}
export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Sidebar />
                <Content>
                    <Router>
                        <GuardProvider guards={[requireLogin]}>
                            <Switch>
                                <GuardedRoute
                                    path="/authenticate"
                                    component={Authentication}
                                />
                                <GuardedRoute
                                    exact
                                    path="/"
                                    component={HomeScreen}
                                    meta={{ auth: true }}
                                />
                                <GuardedRoute
                                    exact
                                    path="/album/:id"
                                    component={AlbumScreen}
                                    meta={{ auth: true }}
                                />
                            </Switch>
                        </GuardProvider>
                    </Router>
                </Content>
            </div>
        );
    }
}
