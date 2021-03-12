import React, { useRef } from 'react';
import { createStore } from 'redux';
interface IGlobalReducer{
    currPlaying: string;
    playlist: string[];
    isPlaying: boolean;
}
const INITIAL_STATE: IGlobalReducer = {
    currPlaying: '',
    playlist: [],
    isPlaying: true,
}

function reducer(state = INITIAL_STATE, action: any): IGlobalReducer{
    switch(action.type){
        case 'SET_MUSIC_TO_PLAY':
            return { ...state, currPlaying: action.currPlaying, playlist: action.playlist, isPlaying: action.isPlaying }
        case 'PLAY_MUSIC':
            return { ...state, isPlaying: action.isPlaying}
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;