import React, {useState} from 'react';
import "./HeaderTask.scss"
import {Dropdown, Modal} from "antd";
import {FaAngleDown, FaFlipboard, FaListUl, FaPlus} from "react-icons/fa";
import AddProject from "~/components/Client/Project/Add";
import {useDispatch} from "react-redux";
import {setIsCreateProject} from "~/redux/reducer/project/projectReducer";
import {NavLink} from "react-router-dom";
import {config} from "~/config";


HeaderTask.prototype={

}
function HeaderTask({onCurrentProject}) {
    return (
        <div className="navbar-app">
            <NavLink className='list-task'  to={config.routes.backlog}>
                <FaListUl className='icon' />
                <span className='text' >Danh Sách Công Việc</span>
            </NavLink>
        </div>
    );
}

export default HeaderTask;