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

export const getListPosts = async ({ sort,filter, search,keySearch, page,user_id } = {}) => {
    console.log({ sort,filter, search, page })
    const url = `posts`;
    const queryString = [];
    if (sort) {queryString.push(`orderBy=${sort}`)}
    if(user_id) queryString.push(`user_id=${user_id}`)
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
export const createComment = async (id,body) => {
    const url =`posts/${id}/comments`;
    const response = await axiosClient.post(url, body, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status:1,message:'Thêm bình luận thành công'}
    } else if (response.status === 401) {return 401}
    else
        return {status:0,message:'Thêm bình luận thất bại'}

};

export const getListCommentsPost = async (id) => {
    const url = `posts/${id}/comments`;
    const response = await axiosClient.get(url,  configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status:1,data:response.data.results,message:''}
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
    const response = await axiosClient.delete(url, configHeadersAuthenticate());
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
    if (response.status === 1) {
        return {status: 1, message: 'Cập Nhật Bài Viết Thành Công'}
    } else if (response.status === 401) return 401
    else{
        return {status: 0, message: 'Cập Nhật Bài Viết Thất Bại'}
    }
};
export const editComment = async (id,body) => {
    const url = `posts/${id}/comments`;
    const response = await axiosClient.put(url, body, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status: 1, message: 'Cập Nhật Bình Luận Thành Công'}
    } else if (response.status === 401) return 401
    else{
        return {status: 0, message: 'Cập Nhật Bình Luận Thất Bại'}
    }
};
export const deletePost = async (id) => {
    const url = `/posts/${id}`;
    const response = await axiosClient.delete(url, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status: 1, message: 'Xóa Bài Viết Thành Công'}
    } else if (response.status === 401) return 401
    else{
        return {status: 0, message: 'Xóa Bài Viết Thất Bại'}
    }
}
export const deleteComment = async (id) => {
    const url = `/comments/${id}`;
    const response = await axiosClient.delete(url, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status: 1, message: 'Xóa bình luận thành công'}
    } else if (response.status === 401) return 401
    else {
        return {status: 0, message: 'CXóa bình luậ thất bại'}
    }
}
