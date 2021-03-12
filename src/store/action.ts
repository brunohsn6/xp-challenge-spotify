import StringUtils from "../utils/StringUtils";

export function playMusic(currPlaying: string, playlist: string[]){
    return {
        type: 'SET_MUSIC_TO_PLAY',
        isPlaying: !StringUtils.isNullOrEmpty(currPlaying),
        currPlaying,
        playlist
    }
}
export function setMusicState(isPlaying: boolean){
    return {
        type: 'SET_MUSIC_STATE',
        isPlaying
    }
}