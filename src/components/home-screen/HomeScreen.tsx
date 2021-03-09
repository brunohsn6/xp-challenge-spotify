import React, { Component } from 'react';
import { Input, InputType } from '../common/input-components/Input';
import './HomeScreen.scss';
import SpotifyService, { ISearchAll } from '../../core/services/SpotifyService';
import { Timers } from '../../utils/Timers';
import If from '../../utils/If';
class InternalState {
    public searchInput: string;
    public searchValue: string;
    public content: ISearchAll;
    constructor() {
        this.searchInput = '';
        this.searchValue = '';
        this.content = null;
    }
}
export default class HomeScreen extends Component<{}, InternalState> {
    private spotifyService: SpotifyService;
    private timer: Timers;
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = new InternalState();
        this.handleSearch = this.handleSearch.bind(this);
        this.spotifyService = new SpotifyService();
        this.timer = new Timers();
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
                <If test={this.state.content != null}>
                    <section className="content">
                        {this.state.content?.albums.items.map(
                            (content, idx) => (
                                <section
                                    className="desc-section"
                                    key={`album-${idx}`}
                                >
                                    <img
                                        className="img"
                                        src={content.images[0].url}
                                    />
                                    <span className="desc">{content.name}</span>
                                </section>
                            ),
                        )}
                    </section>
                    <br></br>
                    <br></br>
                    <section className="content">
                        {this.state.content?.artists.items.map(
                            (content, idx) => (
                                <section
                                    className="desc-section"
                                    key={`artist-${idx}`}
                                >
                                    <If test={content.images[0]?.url != null}>
                                        <img
                                            className="img"
                                            src={content.images[0]?.url}
                                        />
                                    </If>
                                    <span className="desc">{content.name}</span>
                                </section>
                            ),
                        )}
                    </section>
                    <br></br>
                    <br></br>
                    <section className="content">
                        {this.state.content?.tracks.items.map(
                            (content, idx) => (
                                <section
                                    className="desc-section"
                                    key={`track-${idx}`}
                                >
                                    <img
                                        className="img"
                                        src={content.album.images[0].url}
                                    />
                                    <span className="desc">{content.name}</span>
                                </section>
                            ),
                        )}
                    </section>
                </If>
            </div>
        );
    }
}
