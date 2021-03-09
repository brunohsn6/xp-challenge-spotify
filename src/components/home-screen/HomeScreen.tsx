import React, { Component } from 'react';
import { Input, InputType } from '../common/input-components/Input';
import './HomeScreen.scss';
class InternalState {
    public searchInput: string;
    constructor() {
        this.searchInput = '';
    }
}
export default class HomeScreen extends Component<{}, InternalState> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = new InternalState();
        this.handleSearch = this.handleSearch.bind(this);
    }
    private handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ searchInput: event.target.value });
    }
    render() {
        return (
            <div className="home-screen">
                <section className="header">
                    <Input
                        id={'home-screen-input-id'}
                        inputLabel={'Busque por artistas, álbuns ou músicas'}
                        onChange={this.handleSearch}
                        value={this.state.searchInput}
                        placeholder="Começe a escrever..."
                        inputType={InputType.BIG}
                    />
                </section>
            </div>
        );
    }
}
