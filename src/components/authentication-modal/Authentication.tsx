import React, { Component } from 'react';
import './Authentication.scss';
import AuthenticationService from '../../core/services/AuthenticationService';
import { Input } from '../common/input-components/Input';
import { Button } from '../common/buttons/basic-button/BasicButton';
import { Redirect } from 'react-router';

class InternalState {
    public token: string;
    public redirect: string;
    constructor() {
        this.token = '';
        this.redirect = null;
    }
}
export default class Authentication extends Component<{}, InternalState> {
    private authenticationService: AuthenticationService;
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = new InternalState();
        this.handleChange = this.handleChange.bind(this);
        this.authenticateToken = this.authenticateToken.bind(this);
        this.authenticationService = new AuthenticationService();
    }
    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ token: event.target.value });
    }
    private async authenticateToken(event: React.FormEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        this.authenticationService.authorizeByToken(this.state.token);
        if (AuthenticationService.isAuthenticated()) {
            this.setState({ redirect: '/' });
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        return (
            <div className="authentication-container">
                <div className="authentication-backdrop">
                    <section className="authentication-modal">
                        <form onSubmit={this.authenticateToken}>
                            <Input
                                id={'auth-input-id'}
                                value={this.state.token}
                                onChange={this.handleChange}
                                placeholder="Digite o Token..."
                            />
                            <Button type="submit" label="Autenticar" />
                        </form>
                    </section>
                </div>
            </div>
        );
    }
}
