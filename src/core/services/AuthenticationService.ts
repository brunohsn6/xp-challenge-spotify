import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
const spotifyCredentials ={
    clientId: 'c1f97b41a2244ebda219d6deb5df9915',
    secret: "ee14d89aa58f48c5a38f4f93f1d44e5f"
}
const spotify_url: string = 'https://accounts.spotify.com';
interface IToken{
    access_token: string;
    expires_in: number;
    token_type: string;
}
export default class AuthenticationService {
    public async authorize(): Promise<boolean> {
        const options:AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(spotifyCredentials.clientId + ':' + spotifyCredentials.secret)
            },
            data: 'grant_type=client_credentials',
            method: "POST"

        }
        try {
            const res: IToken = (await axios(`${spotify_url}/api/token`, options)).data;
            Cookies.set('authorization', `${res.access_token}`, { expires: res.expires_in, path: window.location.origin, sameSite: 'strict', secure:true });
            return AuthenticationService.isAuthenticated();
        } catch (e) {
            return false;
        }
    }
    public static isAuthenticated(): boolean{
        const authToken = Cookies.get("authorization");
        return authToken != null && authToken != "";
    }
}
