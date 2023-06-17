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
export const getListSprintByProjectId = async (id) => {
    const url = `sprints?project_id=${id}`;
    const response = await axiosClient.get(url,configHeadersAuthenticate());
    console.log('response', response)
    if(response.status === 1 || response.message ==="Success") {
        return {status:1,data:response.data.result,message:'Lấy thông tin dự án thành công'}
    }
    else if (response.status===401)   return {status:401,message:'Không thể xác thực'}
    else {
        return {status:0,data:[],message:'Không thể lấy thông tin dự án.'}
    }
};
export const getSprintById = async ({ sprint_id, assignee_employee_ids,duration_complete,priorities,
    board_column_id,task_title,is_assignee,is_priority,is_duration_complete} = {}) => {
    const url = `sprints/getOne`;
    const queryString = [];
    if (sprint_id) {
        queryString.push(`sprint_id=${sprint_id}`);
    }
    if (assignee_employee_ids ) {
        if(Array.isArray(assignee_employee_ids)) {
            queryString.push(`assignee_employee_ids=${assignee_employee_ids.join(',')}`);
        }else   queryString.push(`assignee_employee_ids=${assignee_employee_ids}`);

    }
    if (duration_complete ) {
        queryString.push(`duration_complete=${duration_complete}`);
    }
    if (priorities && priorities.length>0) {
        queryString.push(`priorities=${priorities.join(',')}`);
    }
    if (task_title) {
        queryString.push(`task_title=${task_title}`);
    }
    if (is_assignee) {// ko giao cho ai
        queryString.push(`is_assignee=${true}`);
    }
    if (!!is_duration_complete) {// quá hạn và phải truyền board_column_id
        queryString.push(`is_duration_complete=${is_duration_complete}`);
    }
    if (board_column_id) { // truyền board_column_id của Colum Done
        queryString.push(`board_column_id=${board_column_id}`);
    }
    const final_url = concatQueryString(queryString, url);
    const response = await axiosClient.get(final_url,configHeadersAuthenticate());
    console.log('response', response)
    if(response.status === 1 || response.message ==="Success") {
        return {status:1,data:response.data.result,message:'Lấy thông tin danh sách công việc thành công'}
    }
    else if (response.status===401)   return {status:401,message:'Không thể xác thực'}
    else {
        return {status:0,data:[],message:'Không thể lấy thông tin danh sách công việc.'}
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
export const completeSprint = async (id, body) => {
    const url = `sprints/${id}`;
    const response = await axiosClient.put(url, body, configHeadersAuthenticate());
    console.log(response)
    if(response.status === 1 || response.message ==="Success") {
        return {status:1,message:'Hoàn thành chu kỳ phát triển thành công'}
    }
    else if (response.status ===0){
        return {status:0,message:'Hoàn thành chu kỳ phát triển thất bại'}
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

