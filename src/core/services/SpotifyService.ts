import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import CONSTANTS from '../../constants';
export interface IImage{
    height: number;
    width: number;
    url: string;
}
export interface IFollower{
    href: string | null;
    total: number;
}
export interface ISearch<T>{
    href: string;
    items: T[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}
export interface IRecentlyPlayedTrack{
    context: any;
    played_at: moment.Moment;
    track: ITrack;
}
export interface IArtist{
    external_urls: any;
    followers: IFollower;
    genres: string[];
    href: string;
    id: string;
    images: IImage[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}
export interface IAlbum{
    album_type: string;
    artists: IArtist[];
    available_markets: string[];
    external_urls: any;
    href: string;
    id: string;
    images: IImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string,
    uri: string

}
export interface ITrack{
    album: IAlbum;
    artists: IArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explict: false;
    external_ids: any;
    external_urls: any;
    href: string;
    id: string;
    is_local: false;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}
export interface ISearchAll{
    artists: ISearch<IArtist>;
    albums: ISearch<IAlbum>;
    tracks: ISearch<ITrack>;
}

export default class SpotifyService{
    public async search(query: string): Promise<ISearchAll> {
        try{
            const options: AxiosRequestConfig = {
                params: {
                    q: query,
                    type: 'artist,album,track'
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authorization')}`
                }
            };
            
            const { artists, albums, tracks } = (await axios.get<{artists: ISearch<IArtist>, albums: ISearch<IAlbum>, tracks: ISearch<ITrack>}>(`${CONSTANTS.spotifyBaseUrl}${CONSTANTS.spotifySearchUrl}`, options)).data;
            return {artists, albums, tracks};

        }catch(e){
            if(e.response.status == 401){
                history.pushState({}, '', '/authenticate');
                history.go();
            }
        }
    }
    public async getAlbumsTracks(albumId: string): Promise<{albumTracks: ISearch<ITrack>, album: IAlbum}>{
        try{
            const spotifyAlbumsUrl: string = CONSTANTS.spotifyAlbumsUrl.replace('{id}',albumId);
            const options: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authorization')}`
                }
            };
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
            }
        }
        
    }
    public async getUsersRecentlyPlayedTracks(): Promise<ISearch<IRecentlyPlayedTrack>>{
        try{
            const options: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authorization')}`
                }
            };
            const searchedTracks = (await axios.get(`${CONSTANTS.spotifyBaseUrl}${CONSTANTS.spotifyRecentlyPlayedTracksUrl}`, options)).data;
            return searchedTracks;
        }catch(e){
            if(e.response.status == 401){
                history.pushState({}, '', '/authenticate');
                history.go();
            }
        }
    }
    public async getUsersTopArtists(): Promise<ISearch<IArtist>>{
        try{
            const options: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authorization')}`
                }
            };
            const recentlyPlayedTracks = (await axios.get(`${CONSTANTS.spotifyBaseUrl}${CONSTANTS.usersTopArtistsUrl}`, options)).data;
            return recentlyPlayedTracks;
        }catch(e){
            if(e.response.status == 401){
                history.pushState({}, '', '/authenticate');
                history.go();
            }
        }
    }
    
}