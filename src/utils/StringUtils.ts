export default class StringUtils{
    public static isNullOrEmpty(str: string){
        return str == null || str == undefined || str == '';
    }
}