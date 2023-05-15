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

export const getListProjects = async ({ sort,filter, search,keySearch, page } = {}) => {
    console.log({ sort,filter, search, page })
    const url = 'projects';
    const queryString = [];
    if (sort) {
            queryString.push(`orderBy=${sort}`);
    }
    if (search) {
            queryString.push(`name=${search}`);
    }
    if (page) {
        queryString.push(`page=${page}`);
    }
    const final_url = concatQueryString(queryString, url);
    const reponse = await axiosClient.get(final_url, configHeadersAuthenticate());
    console.log('request URL: ' + final_url,'respond',reponse);
    if (reponse.status === 401) {
        return 401;
    } else if (reponse.status === 1) {
        return reponse.data;
    } else {
        return 500;
    }
};

export const getSprintById = async (id) => {
    const url = `sprints/${id}`;
    const response = await axiosClient.get(url,configHeadersAuthenticate());
    //console.log('response', response)
    if (response.status === 1) {
        return response.data.result;
    } else if (response.status === 401) {
        return 401;
    } else {
        return {};
    }
};
export const createSprint = async (body) => {
    const url = 'sprints';
    const response = await axiosClient.post(url, body, configHeadersAuthenticate());
    console.log(response)
    if(response.status === 1 || response.message ==="Success") {
        return {status:1,message:'Tạo chu kỳ phát triển mới thành công'}
    }
    else if (response.status ===0){
                return {status:0,message:'Tạo chu kỳ phát triển thất bại'}
    }


};

export const editSprint = async (id, body) => {
    const url = `sprints`;
    const response = await axiosClient.put(url, body, configHeadersAuthenticate());
    console.log(response)
    if(response.status === 1 || response.message ==="Success") {
        return {status:1,message:'Cập nhật chu kỳ phát triển thành công'}
    }
    else if (response.status ===0){
                      return {status:0,message:'Cập nhật chu kỳ phát triển thất bại'}
    }
};
export const deleteSprint= async (id) => {
    const url = `/sprints/${id}`;
    const response = await axiosClient.delete(url, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status:1,message:'Xóa Chu Kỳ Phát Triển Thành Công'}
    } else if (response.status === 0) {
        return {status:0,message:'Xóa Chu Kỳ Phát Triển Thất Bại'}
    }
};

