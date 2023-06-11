import React from 'react';
import { getCookies } from '../Auth';
import axiosClient from '../../axiosClient';
import {concatQueryString} from "~/utils/concatQueryString";
import {titleToSlug} from "~/utils/titleToSlug";

export const configHeadersAuthenticate = () => {
    const token = getCookies('vps_token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getListPosts = async ({ sort,filter, search,keySearch, page } = {}) => {
    console.log({ sort,filter, search, page })
    const url = 'posts';
    const queryString = [];
    if (sort) {queryString.push(`orderBy=${sort}`)}
    if (search) {
        queryString.push(`name=${search}`);
    }
    if (page) {
        queryString.push(`page=${page}`);
    }
    if(!!filter){
        if (filter.status!== 'all') {
            queryString.push(`status=${filter.status}`);
        }
    }
    const final_url = concatQueryString(queryString, url);
    const reponse = await axiosClient.get(final_url, configHeadersAuthenticate());
    console.log('request URL: ' + final_url);
    if (reponse.status === 401) {
        return 401;
    } else if (reponse.status === 1) {
        return reponse.data;
    } else {
        return 500;
    }
};

export const getPostById = async (id) => {
    const url = `posts/${id}`;
    const response = await axiosClient.get(url,configHeadersAuthenticate());
    console.log(url)
    //console.log('response', response)
    if (response.status === 1) {
        return response.data.result;
    } else if (response.status === 0) {
        return 401;
    } else {
        return {};
    }
};
export const createPost = async (body) => {
    const url = 'posts';
    const response = await axiosClient.post(url, body, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status:1,message:'Thêm bài viết thành công'}
    } else if (response.status === 401) {return 401}
    else
        return {status:0,message:'Thêm bài viết thất bại'}

};
export const getListCommentsPost = async (id) => {
    const url = `posts/${id}/comments`;
    const response = await axiosClient.get(url,  configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status:1,data:response.results,message:''}
    } else if (response.status === 401) {return 401}
    else
        return {status:0,data:[],message:''}

};
export const likePost = async (id,idStaff) => {
    const url = `posts/${id}/employees/${idStaff}`;
    const response = await axiosClient.post(url, {}, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status:1,message:'Thích bài viết thành công'}
    } else if (response.status === 401) {return 401}
    else
        return {status:0,message:'Thích bài viết thất bại'}

};
export const unLikePost = async (id,idStaff) => {
    const url = `posts/${id}/employees/${idStaff}`;
    const response = await axiosClient.delete(url, {}, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status:1,message:'Bỏ thích bài viết thành công'}
    } else if (response.status === 401) {return 401}
    else
        return {status:0,message:'Bỏ thích bài viết thất bại'}

};

export const editPost = async (body) => {
    const url = `posts`;

    const response = await axiosClient.put(url, body, configHeadersAuthenticate());
    console.log(response)
    if(response.status === 1 || response.message ==="Success") {
        return {status:1,message:'Cập nhật bài viết mới thành công'}
    }
    else if (response.status ===0){
        switch (response.code) {
            case -1009:
                return {status:0,message:'Thông tin không chính xác'}
                break
            case -1010:
                return {status:0,message:'Email đã tồn tại ! Vui lòng chọn email khác'}
                break
            case -1011:
                return {status:0,message:'Tài khoản đã bị vo hiệu hóa'}
                break
            default:
                break
        }
    }
};
export const deletePost = async (id) => {
    const url = `/posts/${id}`;
    const response = await axiosClient.delete(url, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status: 1, message: 'Cho Thôi Việc Thành Công'}
    } else if (response.status === 0) {
        return {status: 0, message: 'Cho Thôi Việc Thất Bại'}
    }
}
