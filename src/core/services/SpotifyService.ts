import axios, { AxiosRequestConfig } from "axios";
import CONSTANTS from '../../constants';
import { IAlbum, IArtist, IRecentlyPlayedTrack, ISearch, ISearchAll, ITrack } from '../models/ISpotifyResponse';
import axiosDefaultOptions from '../builder/HeaderBuilder';
export default class SpotifyService{
    public async search(query: string): Promise<ISearchAll> {
        try{
            const options: AxiosRequestConfig = axiosDefaultOptions;
            options.params = {
                q: query,
                type: 'artist,album,track'
            };
            
            const { artists, albums, tracks } = (await axios.get<{artists: ISearch<IArtist>, albums: ISearch<IAlbum>, tracks: ISearch<ITrack>}>(`${CONSTANTS.spotifyBaseUrl}${CONSTANTS.spotifySearchUrl}`, options)).data;
            return {artists, albums, tracks};

        }catch(e){
            if(e.response.status == 401){
                history.pushState({}, '', '/authenticate');
                history.go();
                alert('O token atual expirou!');
            }
            else{
                alert('Ocorreu um erro!');
            }
        }
    }
    public async getAlbumsTracks(albumId: string): Promise<{albumTracks: ISearch<ITrack>, album: IAlbum}>{
        try{
            const spotifyAlbumsUrl: string = CONSTANTS.spotifyAlbumsUrl.replace('{id}',albumId);
            const options: AxiosRequestConfig = axiosDefaultOptions;
            const albumsTracksReq = axios.get(`${CONSTANTS.spotifyBaseUrl}${spotifyAlbumsUrl}/tracks`, options);
            const albumReq = axios.get(`${CONSTANTS.spotifyBaseUrl}${spotifyAlbumsUrl}`, options);
            const { albumTracks, album } = await axios.all([albumsTracksReq, albumReq])
                .then(axios.spread((...responses) =>{
                return {
                    albumTracks: responses[0].data,
                    album: responses[1].data
                }
            }));
            return {albumTracks, album};
        }catch(e){
            if(e.response.status == 401){
                history.pushState({}, '', '/authenticate');
                history.go();
                alert('O token atual expirou!');
            }
            else{
                alert('Ocorreu um erro!');
            }
        }
        
    }
    public async getUsersRecentlyPlayedTracks(): Promise<ISearch<IRecentlyPlayedTrack>>{
        try{
            const options: AxiosRequestConfig = axiosDefaultOptions;
            const searchedTracks = (await axios.get(`${CONSTANTS.spotifyBaseUrl}${CONSTANTS.spotifyRecentlyPlayedTracksUrl}`, options)).data;
            return searchedTracks;
        }catch(e){
            if(e.response.status == 401){
                history.pushState({}, '', '/authenticate');
                history.go();
                alert('O token atual expirou!');
            }
            else{
                alert('Ocorreu um erro!');
            }
        }
    }
    public async getUsersTopArtists(): Promise<ISearch<IArtist>>{
        try{
            const options: AxiosRequestConfig = axiosDefaultOptions;
            const recentlyPlayedTracks = (await axios.get(`${CONSTANTS.spotifyBaseUrl}${CONSTANTS.usersTopArtistsUrl}`, options)).data;
            return recentlyPlayedTracks;
        }catch(e){
            if(e.response.status == 401){
                history.pushState({}, '', '/authenticate');
                history.go();
                alert('O token atual expirou!');
            }
            else{
                alert('Ocorreu um erro!');
            }
        }
    }
    
}