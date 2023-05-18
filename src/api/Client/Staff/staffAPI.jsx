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

export const getListStaffs = async ({ sort,filter, search,keySearch, page } = {}) => {
    const url = 'employees';
    const queryString = [];
    if (sort) {queryString.push(`orderBy=${sort}`)}
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

export const getStaffById = async (id) => {
    const url = `employees/${id}`;
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
export const getListStaffsByDepartmentId = async (id) => {
    const url = `employees/departments/${id}`;
    const response = await axiosClient.get(url,configHeadersAuthenticate());
    console.log(url)
    //console.log('response', response)
    if (response.status === 1) {
        return response.data.result;
    } else if (response.status === 401) {
        return 401;
    } else {
        return {};
    }
};
export const createStaff = async (body) => {
    const url = 'employees';
    const response = await axiosClient.post(url, body, configHeadersAuthenticate());
    if(response.status === 1 || response.message ==="Success") {
        return {status:1,message:'Tạo nhân viên mới thành công'}
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
    console.log(response)

};

export const editStaff = async (body) => {
    const url = `employees`;
    const response = await axiosClient.put(url, body, configHeadersAuthenticate());
    console.log('Respond của edit staff:',response)
    if(response.status === 1 || response.message ==="Success") {
        return {status:1,message:'Cập nhật nhân viên mới thành công'}
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
export const deleteStaff = async (id) => {
    const url = `/employees/${id}`;
    const response = await axiosClient.delete(url, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status:1,message:'Cho Thôi Việc Thành Công'}
    } else if (response.status === 0) {
        return {status:0,message:'Cho Thôi Việc Thất Bại'}
    }
};
// export const getAllStaffsWithEmailAndPhone = async ({ email, phoneNumber } = {}) => {
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
