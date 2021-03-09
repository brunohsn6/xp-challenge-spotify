import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
interface IImage{
    height: number;
    width: number;
    url: string;
}
interface IFollower{
    href: string | null;
    total: number;
}
interface ISearch<T>{
    href: string;
    items: T[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}
interface IArtist{
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
interface IAlbum{
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
interface ITrack{
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
        const spotifySearchUrl: string = 'https://api.spotify.com/v1/search'
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
        
        const { artists, albums, tracks } = (await axios.get<{artists: ISearch<IArtist>, albums: ISearch<IAlbum>, tracks: ISearch<ITrack>}>(spotifySearchUrl, options)).data;
        return {artists, albums, tracks};
    }
    
}