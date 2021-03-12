import Cookies, { CookieAttributes } from 'js-cookie';
import StringUtils from '../../utils/StringUtils';

export default class AuthenticationService {
    public authorizeByToken(token: string): void{
        const cookieParams : CookieAttributes = { path: window.location.origin, sameSite: 'strict', secure: true };
        if(!StringUtils.isLocalhost(window.location.origin)){
            Cookies.set('authorization', `${token}`, cookieParams);
        }
        else{
            Cookies.set('authorization', `${token}`);
        }
    }
    public static isAuthenticated(): boolean{
        const authToken = Cookies.get('authorization');
        return authToken != null && authToken != "";
    }
}
