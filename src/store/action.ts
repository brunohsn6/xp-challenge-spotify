export function playMusic(currPlaying: string, playlist: string[]){
    return {
        type: 'SET_MUSIC_TO_PLAY',
        isPlaying: false,
        currPlaying,
        playlist
    }
}
export function setMusicState(isPlaying: boolean){
    return {
        type: 'PLAY_MUSIC',
        isPlaying
    }
}