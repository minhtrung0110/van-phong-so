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

export const getListTasksFilter = async ({sort, filter, search, assignee_employee_ids,sprint_id,project_id,is_assignee} = {}) => {
    console.log({sort, filter, search, assignee_employee_ids,sprint_id,project_id,is_assignee})
    const url = 'boardColumns';
    const queryString = [];
    if(project_id) queryString.push(`project_id=${project_id}`);
    if(sprint_id) queryString.push(`sprint_id=${sprint_id}`);
    if (assignee_employee_ids) {
        queryString.push(`assignee_employee_ids=${assignee_employee_ids.join(',')}`);
    }
    if (sort && sort.length > 0) {
        sort.forEach((item) => {
            queryString.push(`sort[${titleToSlug(item.key)}]=${item.value}`);
        });
    }
    if (search) {
        // queryString.push(`${keySearch}=${search}`);
        queryString.push(search);
    }

    const final_url = concatQueryString(queryString, url);
    const reponse = await axiosClient.get(final_url, configHeadersAuthenticate());
    console.log('request URL: ' + final_url);
    if (reponse.status === 401) {
        return 401;
    } else if (reponse.status === 1) {
        return reponse.data.result;
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
export const getSubTask = async (idTask) => {
    const url = `subtasks/${idTask}`;
    const response = await axiosClient.get(url, configHeadersAuthenticate());
    console.log(response)
    if (response.status === 1 || response.message === "Success") {
        return {status: 1,data:response.data.result, message: 'Lấy thông tin công việc cần làm thành công'}
    } else if (response.status === 401) return 401
    else {
        return {status: 0, message: 'Lấy thông tin công việc cần làm thất bại'}
    }


};

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
    else {
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
        return {status: 1, message: 'Xóa Công Việc Thành Công'}
    } else if (response.status === 401) return 401
    else {
        return {status: 0, message: 'Xóa Công Việc Thất Bại'}
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

