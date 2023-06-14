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

export const getListTasks = async ({sort, filter, search, keySearch, page} = {}) => {
    console.log({sort, filter, search, page})
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
    if (!!filter) {
        if (filter.status !== 'all') {
            queryString.push(`status=${filter.status}`);
        }
        if (filter.role !== 'all') {
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

export const getTaskById = async (id) => {
    const url = `tasks/${id}`;
    const response = await axiosClient.get(url, configHeadersAuthenticate());
    //console.log('response', response)
    if (response.status === 1) {
        if (response.status === 1) {
            return {status: 1, message: 'Lấy thông tin chi tiết công việc thành công'}
        } else if (response.status === 401) {
            return 401
        } else
            return {status: 0, message: 'Lấy thông tin chi tiết công việc thất bại'}
    }
}

export const createTask = async (body) => {
    const url = 'tasks';
    const response = await axiosClient.post(url, body, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1 || response.message === "Success") {
        return {status: 1, message: 'Tạo công việc mới thành công'}
    } else if (response.status === 0) {
        return {status: 0, message: 'Tạo công việc thất bại'}
    }


};

export const createSubTask = async (body) => {
    const url = 'subtasks';
    const response = await axiosClient.post(url, body, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1 || response.message === "Success") {
        return {status: 1, message: 'Tạo công việc mới thành công'}
    } else if (response.status === 0) {
        return {status: 0, message: 'Tạo công việc thất bại'}
    }


};
export const dragAndDropTask = async (body) => {
    const url = `tasks/switch`;
    const response = await axiosClient.put(url, body, configHeadersAuthenticate());
    if (response.status === 1 || response.message === "Success") {
        return {status: 1, message: 'Cập nhật công việc thành công'}
    } else if (response.status === 0) {
        return {status: 0, message: 'Cập nhật công việc thất bại'}
    }
};
export const editTask = async (body) => {
    const url = `tasks`;
    const response = await axiosClient.put(url, body, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status: 1, message: 'Cập nhật công việc thành công'}
    } else if (response.status === 401) return 401
    else{
        return {status: 0, message: 'Cập nhật công việc thất bại'}
    }
};
export const editSubTask = async (body) => {
    const url = 'subtasks';
    const response = await axiosClient.put(url, body, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1 || response.message === "Success") {
        return {status: 1, message: 'Tạo công việc mới thành công'}
    } else if (response.status === 0) {
        return {status: 0, message: 'Tạo công việc thất bại'}
    }


};
export const deleteTask = async (id) => {
    const url = `/tasks/${id}`;
    const response = await axiosClient.delete(url, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1) {
        return {status: 1, message: 'Xóa Chu Kỳ Phát Triển Thành Công'}
    } else if (response.status === 0) {
        return {status: 0, message: 'Xóa Chu Kỳ Phát Triển Thất Bại'}
    }
};
export const deleteSubTask = async (id) => {
    const url = `/subtasks/${id}`;
    const response = await axiosClient.delete(url, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1 || response.message === "Success") {
        return {status: 1, message: 'Tạo công việc mới thành công'}
    } else if (response.status === 0) {
        return {status: 0, message: 'Tạo công việc thất bại'}
    }


};

