import React, { Component } from 'react';
import { Input, InputType } from '../common/input-components/Input';
import './HomeScreen.scss';
import SpotifyService, {
    IArtist,
    IRecentlyPlayedTrack,
    ISearch,
    ISearchAll,
} from '../../core/services/SpotifyService';
import { Timers } from '../../utils/Timers';
import SearchScreen from './SearchScreen';
import UserIndicationsScreen from './UserIndicationsScreen';
import If from '../../utils/If';
import { Redirect } from 'react-router';
import StringUtils from '../../utils/StringUtils';
import { connect } from 'react-redux';
import { playMusic } from '../../store/action';
import CONSTANTS from '../../constants';
class InternalState {
    public searchInput: string;
    public searchValue: string;
    public content: ISearchAll;
    public usersContent: {
        tracks: ISearch<IRecentlyPlayedTrack>;
        artists: ISearch<IArtist>;
    };
    redirect: string;
    constructor() {
        this.searchInput = '';
        this.searchValue = '';
        this.content = null;
        this.redirect = null;
        this.usersContent = { tracks: null, artists: null };
    }
}
interface IHomeScreenProps {
    playMusic: any;
}
class HomeScreen extends Component<IHomeScreenProps, InternalState> {
    private spotifyService: SpotifyService;
    private timer: Timers;
    constructor(props: IHomeScreenProps) {
        super(props);
        this.state = new InternalState();
        this.spotifyService = new SpotifyService();
        this.timer = new Timers();
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAlbumClick = this.handleAlbumClick.bind(this);
        this.handleTrackClick = this.handleTrackClick.bind(this);
    }
    async componentDidMount() {
        const userArtists = await this.spotifyService.getUsersTopArtists();
        const userTracks = await this.spotifyService.getUsersRecentlyPlayedTracks();
        this.setState({
            usersContent: { tracks: userTracks, artists: userArtists },
        });
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
    private handleAlbumClick(albumId: string, artist: string) {
        localStorage.setItem('albumId', albumId);
        history.pushState({}, 'Home', `/album/${artist}`);
        history.go();
    }
    private handleTrackClick(trackId: string) {
        let preview_url = null;
        if (
            this.state?.content != null &&
            !StringUtils.isNullOrEmpty(this.state.searchValue)
        ) {
            preview_url = this.state.content.tracks.items.find(
                track => track.id == trackId,
            )?.preview_url;
        } else {
            preview_url = this.state.usersContent.tracks.items.find(
                track => track.track.id == trackId,
            )?.track.preview_url;
        }
        this.props.playMusic(preview_url, [preview_url]);
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
                        animated
                    />
                </section>
                <If
                    test={
                        this.state.content != null &&
                        !StringUtils.isNullOrEmpty(this.state.searchValue)
                    }
                >
                    <SearchScreen
                        albumContent={this.state.content?.albums}
                        artistContent={this.state.content?.artists}
                        trackContent={this.state.content?.tracks}
                        searchValue={this.state.searchValue}
                        handleAlbumClick={this.handleAlbumClick}
                        handleTrackClick={this.handleTrackClick}
                    />
                </If>
                <If
                    test={
                        this.state.content == null ||
                        StringUtils.isNullOrEmpty(this.state.searchValue)
                    }
                >
                    <UserIndicationsScreen
                        tracksContent={this.state.usersContent?.tracks}
                        artistContent={this.state.usersContent?.artists}
                        handleTrackClick={this.handleTrackClick}
                    />
                </If>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch: any) => ({
    playMusic: (music: string, playlist: string[]) =>
        dispatch(playMusic(music, playlist)),
});
export default connect(null, mapDispatchToProps)(HomeScreen);
