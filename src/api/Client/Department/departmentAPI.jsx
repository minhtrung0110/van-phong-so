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

export const getListDepartments = async ({sort, filter, search, keySearch, page} = {}) => {
    console.log({sort, filter, search, page})
    const url = 'departments';
    const queryString = [];
    if (sort) {
        queryString.push(`orderBy=${sort}`)
    }
    if (search) {
        queryString.push(`name=${search}`);
    }
    if (page) {
        queryString.push(`page=${page}`);
    }
    if (!!filter) {
        if (filter.status !== 'all') {
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

export const getDepartmentById = async (id) => {
    const url = `departments/${id}`;
    const response = await axiosClient.get(url, configHeadersAuthenticate());
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
export const createDepartment = async (body) => {
    const url = 'departments';
    const response = await axiosClient.post(url, body, configHeadersAuthenticate());
    if (response.status === 1 || response.message === "Success") {
        return {status: 1, message: 'Tạo phòng ban thành công'}
    } else if(response.status===401)return 401
    else return {status: 1, message: 'Tạo phòng ban thất bại'}

};

export const editDepartment = async (body) => {
    const url = `departments`;

    const response = await axiosClient.put(url, body, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1 || response.message === "Success") {
        return {status: 1, message: 'Cập nhật phòng ban thành công'}
    } else return {status: 1, message: 'Cập nhật phòng ban thất bại'}

};
export const deleteDepartment = async (id) => {
    const url = `/departments/${id}`;
    const response = await axiosClient.delete(url, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status: 1, message: 'Đóng Phòng Ban Thành Công'}
    } else if (response.status === 401) return 401
    else {
        return {status: 0, message: 'Đóng Phòng Ban Thất Bại'}
    }
};
// export const getAllDepartmentsWithEmailAndPhone = async ({ email, phoneNumber } = {}) => {
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
