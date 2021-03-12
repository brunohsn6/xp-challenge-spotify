import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const axiosDefaultOptions: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('authorization')}`
    }
};
export default axiosDefaultOptions;