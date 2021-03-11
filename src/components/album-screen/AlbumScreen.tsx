import moment from 'moment';
import React, { Component } from 'react';
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
    constructor() {
        this.tracks = null;
        this.album = null;
        this.backPage = false;
    }
}
export default class AlbumScreen extends Component<{}, InternalState> {
    private spotifyService: SpotifyService;

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = new InternalState();
        this.spotifyService = new SpotifyService();
        this.handleBack = this.handleBack.bind(this);
    }
    async componentDidMount() {
        const id = window.location.pathname.split('/').pop();
        const {
            albumTracks,
            album,
        } = await this.spotifyService.getAlbumsTracks(id);
        this.setState({ tracks: albumTracks, album: album });
    }
    private handleBack(): void {
        history.go(-1);
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
                                    className="track-item"
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
