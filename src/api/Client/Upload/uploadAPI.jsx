import axiosClient from '../../axiosClient';
import {getCookies} from "~/api/Client/Auth";
export const configHeadersAuthenticate = () => {
    const token = getCookies('vps_token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const uploadImage = async (body) => {
    const url = `image/upload/`
    const response = await axiosClient.post(url, body, configHeadersAuthenticate());
    console.log(response)

    if (response.status === 401) {
        return 401;
    } else if (response.status ===1 && response.message=== 'Success') {
        return response.data.result;
    } else {
        return 500;
    }
};
