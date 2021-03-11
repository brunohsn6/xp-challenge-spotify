import moment from 'moment';
import React, { useState } from 'react';
import './MusicControls.scss';

interface IMusicControls {
    audioRef: React.RefObject<HTMLAudioElement>;
    isPlaying?: boolean;
    playOrPause: any;
    shuffleMusic: any;
    setVolumn: any;
}
export function MusicControls({
    audioRef,
    isPlaying,
    playOrPause,
    shuffleMusic,
    setVolumn,
}: IMusicControls) {
    const [duration, setDuration] = useState(0);
    const [curr, setCurr] = useState(0);
    const handleProgress = (e: any) => {
        const progress = (Number(e.target.value) * duration) / 100;
        setCurr(progress);
        audioRef.current.currentTime = progress;
    };
    const getProgressValue = () => {
        const value = (curr * 100) / duration;
        return !Number.isNaN(value) ? value : 0;
    };
    return (
        <>
            <audio
                onTimeUpdate={e => setCurr((e.target as any).currentTime)}
                onCanPlay={e => setDuration((e.target as any).duration)}
                ref={audioRef}
                src={`https://p.scdn.co/mp3-preview/61144d52a3b955f9649313fa416b397acc0b28a6?cid=c1f97b41a2244ebda219d6deb5df9915`}
            />
            <div className="music-controls">
                <div className="music-progress-bar">
                    <span className="current">
                        {curr.toFixed(2).replace('.', ':')}
                    </span>
                    <input
                        id="progress-bar"
                        type="range"
                        name="progress-bar"
                        className="progress-bar"
                        onChange={handleProgress}
                        value={getProgressValue()}
                    />
                    <span className="total">
                        {duration.toFixed(2).replace('.', ':')}
                    </span>
                </div>
                <div className="music-state-controls">
                    <i
                        className="arrow-shuffle-back"
                        onClick={() => shuffleMusic(false)}
                    />
                    <i
                        className={`${!isPlaying ? 'play' : 'pause'}`}
                        onClick={playOrPause}
                    />
                    <i
                        className="arrow-shuffle-foward"
                        onClick={() => shuffleMusic(true)}
                    />
                </div>
            </div>
            <div className="volumn-controls">
                <span className="volumn">
                    <span>-</span>
                    <input
                        id="volumn-bar"
                        type="range"
                        name="volumn-bar"
                        className="volumn-bar"
                        onChange={e => setVolumn(Number(e.target.value) / 100)}
                    />
                    <span>+</span>
                </span>
            </div>
        </>
    );
}
