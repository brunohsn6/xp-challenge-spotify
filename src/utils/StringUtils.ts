const localhostRegExp = /(127.0.0.1|localhost)/;
export default class StringUtils{
    public static isNullOrEmpty(str: string){
        return str == null || str == undefined || str == '' || str.replace(" ", "").length == 0;
    }
    public static isLocalhost(origin: string){
        return localhostRegExp.test(origin);
    }
}