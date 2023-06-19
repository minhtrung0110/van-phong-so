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
    if (sort && sort.length > 0) {
        sort.forEach((item) => {
            queryString.push(`sort[${titleToSlug(item.key)}]=${item.value}`);
        });
    }
    if (search) {
        // queryString.push(`${keySearch}=${search}`);
        queryString.push(search);
    }
    if (page) {
        queryString.push(`page=${page}`);
    }
    if(!!filter){
        if (filter.status!== 'all') {
            queryString.push(`status=${filter.status}`);
        }
        if (filter.role!== 'all') {
            queryString.push(`role_id=${filter.role}`);
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

export const getProjectById = async (id,search) => {
    const url = `projects/${id}`;
    const queryString = [];
    if (search) {
        queryString.push(`search=${search}`);
    }
    const final_url = concatQueryString(queryString, url);
    const response = await axiosClient.get(final_url,configHeadersAuthenticate());
    if(response.status === 1 || response.message ==="Success") {
        return {status:1,data:response.data.result,message:'Lấy thông tin dự án thành công'}
    }
    else if (response.status===401)   return {status:401,message:'Không thể xác thực'}
    else {
        return {status:0,data:[],message:'Không thể lấy thông tin dự án.'}
    }
};
export const getStaffsProjectById = async (id,search) => {
    const url = `projects/${id}/employees`;
    const queryString = [];
    if (search) {
        queryString.push(`search=${search}`);
    }
    const final_url = concatQueryString(queryString, url);
    const response = await axiosClient.get(final_url,configHeadersAuthenticate());
    if(response.status === 1 || response.message ==="Success") {
        return {status:1,data:response.data.result,message:'Lấy thông tin dự án thành công'}
    }
    else if (response.status===401)   return {status:401,message:'Không thể xác thực'}
    else {
        return {status:0,data:[],message:'Không thể lấy thông tin dự án.'}
    }
};
export const createProject = async (body) => {
    const url = 'projects';
    const response = await axiosClient.post(url, body, configHeadersAuthenticate());
    console.log(response)
    if(response.status === 1 ) {
        return {status:1,message:'Tạo dự án mới thành công'}
    }else if(response.status ===401) return 401
    else  return {status:0,message:'Tạo dự án mới thành công'}
    // xac thuc 401


};

export const editProject = async (body) => {
    const url = `projects`;
    const response = await axiosClient.put(url, body, configHeadersAuthenticate());
    console.log(response,body)
    if(response.status === 1 || response.message ==="Success") {
        return {status:1,message:'Cập nhật dự án thành công'}
    }
    else  return {status:0,message:'Cập nhật dự án thành công'}
    // xac thuc 401
}
export const disableProject = async (body) => {
    const url = `/projects`;
    const response = await axiosClient.put(url, body, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status:1,message:'Cho Dự Án Dừng Thành Công'}
    } else if (response.status === 0) {
        return {status:0,message:'Cho Dự Án Dừng Thất Bại'}
    }
};
export const addStaffInProject = async (id,idStaff) => {
    const url = `/projects/${id}/employees/${idStaff}`;
    const response = await axiosClient.post(url,{}, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status:1,message:'Thêm nhân viên thành công'}
    } else if (response.status === 401) {return 401}
    else
        return {status:0,message:'Thêm nhân viên Thất Bại'}

};
export const deleteStaffInProject = async (id,idStaff) => {
    const url = `/projects/${id}/employees/${idStaff}`;
    const response = await axiosClient.delete(url, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status:1,message:'Xóa nhân viên thành công'}
    } else if (response.status === 401) {return 401}
    else
        return {status:0,message:'Xóa nhân viên Thất Bại'}

};

