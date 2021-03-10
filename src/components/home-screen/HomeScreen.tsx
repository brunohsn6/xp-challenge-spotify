import React, { Component } from 'react';
import { Input, InputType } from '../common/input-components/Input';
import './HomeScreen.scss';
import SpotifyService, { ISearchAll } from '../../core/services/SpotifyService';
import { Timers } from '../../utils/Timers';
import SearchScreen from './SearchScreen';
import UserIndicationsScreen from './UserIndicationsScreen';
import If from '../../utils/If';
import { Redirect } from 'react-router';
class InternalState {
    public searchInput: string;
    public searchValue: string;
    public content: ISearchAll;
    redirect: string;
    constructor() {
        this.searchInput = '';
        this.searchValue = '';
        this.content = null;
        this.redirect = null;
    }
}
export default class HomeScreen extends Component<{}, InternalState> {
    private spotifyService: SpotifyService;
    private timer: Timers;
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = new InternalState();
        this.spotifyService = new SpotifyService();
        this.timer = new Timers();
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAlbumClick = this.handleAlbumClick.bind(this);
    }
    private handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ searchInput: event.target.value });
        this.timer.execOnce(1000, () => {
            this.setState({ searchValue: this.state.searchInput });
            this.search();
        });
    }
    private async search(): Promise<void> {
        const content = await this.spotifyService.search(
            this.state.searchValue,
        );
        if (content) {
            this.setState({ content: content });
        }
    }
    private handleAlbumClick(albumId: string) {
        history.pushState({}, 'Home', `/album/${albumId}`);
        history.go();
    }
    render() {
        if (this.state.redirect) {
            return <Redirect exact to={this.state.redirect} />;
        }
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
                <If test={this.state.content != null}>
                    <SearchScreen
                        albumContent={this.state.content?.albums}
                        artistContent={this.state.content?.artists}
                        trackContent={this.state.content?.tracks}
                        searchValue={this.state.searchValue}
                        handleAlbumClick={this.handleAlbumClick}
                    />
                </If>
                <If test={this.state.content == null}>
                    <UserIndicationsScreen />
                </If>
            </div>
        );
    }
}
