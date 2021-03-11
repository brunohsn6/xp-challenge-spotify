import React, { Component } from 'react';
import { MusicControls } from './MusicControls';
import './MusicBar.scss';
class MusicBarProps {
    audioRef: React.RefObject<HTMLAudioElement>;
    isPlaying: boolean;
    constructor() {
        this.audioRef = React.createRef<HTMLAudioElement>();
        this.isPlaying = false;
    }
}
export default class MusicBar extends Component<{}, MusicBarProps> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = new MusicBarProps();
        this.playOrPause = this.playOrPause.bind(this);
        this.shuffleMusic = this.shuffleMusic.bind(this);
        this.changeVolumn = this.changeVolumn.bind(this);
    }
    private playOrPause(): void {
        if (!this.state.isPlaying) {
            this.state.audioRef.current.play();
        } else {
            this.state.audioRef.current.pause();
        }
        this.setState({ isPlaying: !this.state.isPlaying });
    }
    private changeVolumn(value: any) {
        this.state.audioRef.current.volume = value;
    }
    private shuffleMusic(direction: boolean) {
        //todo
    }
    render() {
        return (
            <div className="music-bar">
                <MusicControls
                    audioRef={this.state.audioRef}
                    isPlaying={this.state.isPlaying}
                    playOrPause={this.playOrPause}
                    shuffleMusic={this.shuffleMusic}
                    setVolumn={this.changeVolumn}
                />
            </div>
        );
    }
}
