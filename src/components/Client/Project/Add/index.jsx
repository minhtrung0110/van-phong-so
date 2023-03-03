import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import GroupMember from "~/components/Client/Task/GroupMember";
import {Input} from "antd/lib";
AddProject.propTypes = {

};

function AddProject(props) {
    const [title,setTitle]=useState()
    return (
        <form className='form-add-project'>

            <div className='input-title'>
                <h4 className='lable'>Tên Dự Án</h4>
                <Input className='input' size="large" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Nhập tên dự án ..."/>
            </div>
            <div className='members'>
                <h4 className='lable'>Thành Viên: </h4>
                <GroupMember/>
            </div>
            <div className='footer'>
                <button className='btn-cancel'>Hủy</button>
                <button className='btn-add' type='submit'>Thêm</button>
            </div>

        </form>
    );
}

export default AddProject;