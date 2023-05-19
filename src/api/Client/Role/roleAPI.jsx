import React from 'react';
import {getCookies} from '../Auth';
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

export const getListRoles = async ({sort, filter, search, keySearch, page} = {}) => {
    console.log({sort, filter, search, page})
    const url = 'roles';
    const queryString = [];
    if (sort) {queryString.push(`orderBy=${sort}`)}
    if (search) {
        queryString.push(`title=${search}`);
    }
    if (page) {
        queryString.push(`page=${page}`);
    }
    if (!!filter) {
        if (filter !== 'all') {
            queryString.push(`status=${(filter === 'active')}`);
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

export const getRoleById = async (id) => {
    const url = `roles/${id}`;
    const response = await axiosClient.get(url,configHeadersAuthenticate());
    if(response.status === 1 || response.message ==="Success") {
        return {status:1,data:response.data.result,message:'Lấy thông tin quyền thành công'}
    }
    else if (response.status===401)   return {status:401,message:'Không thể xác thực'}
    else {
        return {status:0,data:[],message:'Không thể lấy thông tin quyền.'}
    }
};
export const createRole = async (body) => {
    const url = 'roles';
    const response = await axiosClient.post(url, body, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1 || response.message === "Success") {
        return {status: 1, message: 'Tạo quyền mới thành công'}
    } else if (response.status === 401) return {status: 401, message: 'Không thể xác thuc'}
    else
        return {status: 0, message: 'Tạo quyền mới thất bại'}

};

export const editRole = async (body) => {
    const url = `roles`;
    const response = await axiosClient.put(url, body, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1 || response.message === "Success") {
        return {status: 1, message: 'Cập nhật quyền mới thành công'}
    } else if (response.status === 401) return {status: 401, message: 'Không thể xác thuc'}
    else
        return {status: 0, message: 'Cập nhật quyền mới thất bại'}
};
export const deleteRole = async (id) => {
    const url = `/roles/${id}`;
    const response = await axiosClient.delete(url, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1 || response.message === "Success") {
        return {status: 1, message: 'Vô hiệu quyền mới thành công'}
    } else if (response.status === 401) return {status: 401, message: 'Không thể xác thuc'}
    else
        return {status: 0, message: 'Vô hiệu quyền mới thất bại'}
};
// export const getAllRolesWithEmailAndPhone = async ({ email, phoneNumber } = {}) => {
//     const url = '/api/admin/staff';
//     const queryString = [];
//     if (email) {
//         queryString.push(`email=${email}`);
//     }
//     if (phoneNumber) {
//         queryString.push(`phone=${phoneNumber}`);
//     }
//
//     const final_url = concatQueryString(queryString, url);
//     console.log(final_url)
//     const reponse = await axiosClient.get(final_url, configHeadersAuthenticate());
//     if (reponse.status === 401) {
//         return 401;
//     } else if (reponse.status === 'success') {
//         return reponse.data;
//     } else {
//         return 500;
//     }
// };
