import React, { Component, useRef, useState } from 'react';
import { MusicControls } from './MusicControls';
import './MusicBar.scss';
import { connect } from 'react-redux';
import If from '../../utils/If';
import { playMusic, setMusicState } from '../../store/action';
import StringUtils from '../../utils/StringUtils';
interface IMusicBarState {
    isPlaying: boolean;
    currPlaying: string;
    playlist: string[];
    dispatch: any;
}
const MusicBar = (props: IMusicBarState) => {
    const { isPlaying, currPlaying, playlist, dispatch } = props;
    const [audioRef, setAudioRef] = useState(
        React.createRef<HTMLAudioElement>(),
    );
    const playOrPause = () => {
        if (!isPlaying) {
            audioRef.current && audioRef.current.play();
        } else {
            audioRef.current && audioRef.current.pause();
        }

        dispatch(setMusicState(!isPlaying));
    };
    const changeVolumn = (value: any) => {
        audioRef.current.volume = value;
    };
    const shuffleMusic = (direction: boolean) => {
        audioRef.current && audioRef.current.pause();
        let currIdx = playlist.findIndex(track => track == currPlaying);
        const nextMusic = direction
            ? playlist[++currIdx] ?? ''
            : playlist[--currIdx] ?? '';
        dispatch(playMusic(nextMusic, playlist));
    };
    return (
        <If test={!StringUtils.isNullOrEmpty(currPlaying)}>
            <div className="music-bar">
                <MusicControls
                    currPlaying={currPlaying}
                    playlist={playlist}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    playOrPause={playOrPause}
                    shuffleMusic={shuffleMusic}
                    setVolumn={changeVolumn}
                />
            </div>
        </If>
    );
};

export default connect((state: IMusicBarState) => ({
    isPlaying: state.isPlaying,
    currPlaying: state.currPlaying,
    playlist: state.playlist,
}))(MusicBar);
