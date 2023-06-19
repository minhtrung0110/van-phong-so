import React from 'react';

import {getCookies} from '../Auth';
import axiosClient from '../../axiosClient';
import {concatQueryString} from "~/utils/concatQueryString";
import {titleToSlug} from "~/utils/titleToSlug";
import axiosClientCalendar from "~/api/axiosClientCalendar";

export const configHeadersAuthenticate = () => {
    const token = getCookies('vps_token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getListEvents = async (user_id,{sort, filter, search, keySearch, page} = {}) => {
    const url = `events/list/${user_id}`;
    const queryString = [];
    if (sort) {
        queryString.push(`orderBy=${sort}`)
    }
    if (search) {
        // queryString.push(`${keySearch}=${search}`);
        queryString.push(search);
    }
    if (page) {
        queryString.push(`page=${page}`);
    }
    if (!!filter) {
        if (filter.status !== 'all') {
            queryString.push(`status=${filter.status}`);
        }
        if (filter.role !== 'all') {
            queryString.push(`role_id=${filter.role}`);
        }
    }
    const final_url = concatQueryString(queryString, url);
    const reponse = await axiosClientCalendar.get(final_url, configHeadersAuthenticate());
    console.log('request URL: ' + final_url);

    if (reponse.status === 401) {
        return 401;
    } else if (reponse.status === 1) {
        return reponse.data;
    } else {
        return 500;
    }
};

export const getEventById = async (id) => {
    const url = `events/${id}`;
    const response = await axiosClientCalendar.get(url, configHeadersAuthenticate());
    if(response.status === 1 ) {
        return {status:1,data:response.data.result,message:'Lấy thông tin sự kiện thành công'}
    }
    else if (response.status===401)   return {status:401,message:'Không thể xác thực'}
    else {
        return {status:0,data:[],message:'Không thể lấy thông tin .'}
    }
};
export const getListEventsByDepartmentId = async (id) => {
    const url = `events/departments/${id}`;
    const response = await axiosClient.get(url, configHeadersAuthenticate());
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
export const createEvent = async (body) => {
    const url = 'events';
    const response = await axiosClientCalendar.post(url, body, configHeadersAuthenticate());
    if (response.status === 1) {
        return {status: 1, message: 'Tạo sự kiện mới thành công'}
    } else if (response.status === 401) return {status: 401, message: 'Không thể xác thuc'}
    else
        return {
            status: 0, message: 'Tạo sự kiện mới thất bại'
        };
}
export const editEvent = async (body) => {
    const url = `events`;
    const response = await axiosClientCalendar.put(url, body, configHeadersAuthenticate());
    if (response.status === 1) {
        return {status: 1, message: 'Cập nhật sự kiện mới thành công'}
    } else if (response.status === 401) return {status: 401, message: 'Không thể xác thuc'}
    else
        return {
            status: 0, message: 'Cập nhật sự kiện mới thất bại'
        };
};
export const deleteEvent = async (id) => {
    const url = `/events/${id}`;
    const response = await axiosClientCalendar.delete(url, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status: 1, message: 'Xóa Sự Kiện Thành Công'}
    } else if (response.status === 401) return 401
    else{
        return {status: 0, message: 'Xóa Sự Kiện Thất Bại'}
    }
};
// export const getAllEventsWithEmailAndPhone = async ({ email, phoneNumber } = {}) => {
//     const url = '/api/admin/calendar';
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
