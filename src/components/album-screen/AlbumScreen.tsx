import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playMusic, setMusicState } from '../../store/action';
import SpotifyService, {
    IAlbum,
    ISearch,
    ITrack,
} from '../../core/services/SpotifyService';
import If from '../../utils/If';
import {
    BadgeButton,
    EBadgeType,
} from '../common/buttons/badge-button/BadgeButton';
import './AlbumScreen.scss';
class InternalState {
    tracks: ISearch<ITrack>;
    album: IAlbum;
    backPage: boolean;
    musicState: { currPlaying: string; playlist: string[] };
    constructor() {
        this.tracks = null;
        this.album = null;
        this.backPage = false;
    }
}
interface IAlbumScreenProps {
    music: string;
    changeMusic: any;
    isPlaying: boolean;
}
class AlbumScreen extends Component<IAlbumScreenProps, InternalState> {
    private spotifyService: SpotifyService;

    constructor(props: IAlbumScreenProps) {
        super(props);
        this.state = new InternalState();
        this.spotifyService = new SpotifyService();
        this.handleBack = this.handleBack.bind(this);
        this.playFromList = this.playFromList.bind(this);
    }
    async componentDidMount() {
        const albumId = localStorage.getItem('albumId');
        const {
            albumTracks,
            album,
        } = await this.spotifyService.getAlbumsTracks(albumId);
        this.setState({ tracks: albumTracks, album: album });
    }
    async componentWillUnmount() {
        localStorage.removeItem('albumId');
        this.props.changeMusic('', []);
    }
    private handleBack(): void {
        history.go(-1);
    }
    private isPlaying(id: string) {
        return id == this.props.music;
    }
    private playFromList(trackUrl: string) {
        this.props.changeMusic(trackUrl, this.playlist);
    }
    private get playlist(): string[] {
        return this.state.tracks.items.map<string>(track => track.preview_url);
    }
    render() {
        return (
            <div className="album-screen">
                <If test={this.state?.album}>
                    <section className="header">
                        <button className="back-btn" onClick={this.handleBack}>
                            <i className="arrow-back" />
                            {`Voltar`}
                        </button>
                    </section>
                    <section className="album-section">
                        <BadgeButton
                            id={this.state.album?.id}
                            imageDescription={this.state.album?.name}
                            artist={this.state.album?.artists[0]?.name}
                            imageUrl={this.state.album?.images[0]?.url}
                            type={EBadgeType.ALBUM}
                            big
                        />
                    </section>
                </If>
                <section className="tracks-section">
                    <If test={this.state?.tracks}>
                        <ol className="track-list">
                            {this.state?.tracks?.items.map((track, idx) => (
                                <li
                                    key={`track-list-${idx}`}
                                    className={`track-item${
                                        this.isPlaying(track.preview_url)
                                            ? ' playing'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        this.playFromList(track.preview_url)
                                    }
                                >
                                    <span className="track-name">
                                        {track.name}
                                    </span>
                                    <span className="track-duration">
                                        {moment
                                            .duration(track.duration_ms)
                                            .asMinutes()
                                            .toFixed(2)
                                            .replace('.', ':')}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </If>
                </section>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch: any) => ({
    changeMusic: (music: string, playlist: string[]) => {
        dispatch(playMusic(music, playlist));
    },
});
const mapStateToProps = state => ({
    music: state.currPlaying,
    isPlaying: state.isPlaying,
});
export default connect(mapStateToProps, mapDispatchToProps)(AlbumScreen);
