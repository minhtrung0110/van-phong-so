import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import TableLayout from "~/components/commoms/Table";
import {FaEye, FaPen, FaTimesCircle} from "react-icons/fa";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {message, Modal} from "antd";
import AddProject from "~/components/Client/Project/Add";
import EditProject from "~/components/Client/Project/EditProject";
import {useDispatch} from "react-redux";
import {setIsEditProject, setKeyProject, setProject} from "~/redux/reducer/project/projectReducer";
import {useNavigate, useNavigation} from "react-router-dom";
import {config} from "~/config";
import {getProjectById} from "~/api/Client/Project/projectAPI";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import useMessage from "antd/es/message/useMessage";
ProjectTable.propTypes = {

};

function ProjectTable({editItem,deleteItem,tableHeader, tableBody,onUpdate,onDelete}) {
    const [showPopupDelete, setShowPopupDelete] = useState({
        project: null,
        show: false,
    });
    const [messageApi, contextHolder] = message.useMessage();
    const navigate=useNavigate()
    const dispatch =useDispatch()
    const showConfirmDeleteProject = (e, item) => {
        e.stopPropagation();
        setShowPopupDelete({project: item, show: true});
    };
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
    };
    const handleEditProject=  async (item) => {
        const result = await getProjectById(item.id)
        if (result.status===1){
            dispatch(setProject(result.data))
            dispatch(setIsEditProject(true))
        }
        else if(result.status===401){
            messageApi.open({
                type:'error',
                message:result.message,
                duration:1.2
            })
            handleSetUnthorization()
            navigate(config.routes.login)
        }
        else{
            messageApi.open({
                type:'error',
                message:result.message,
                duration:1.2
            })
        }


    };
    const handleRemoveProject = (id) => {
        setShowPopupDelete({...showPopupDelete, show: false});
        onDelete(showPopupDelete.project)
    };

    const handleChosenProject=(item)=>{
        const itemSave={projectId: item.id,currentSprint:null}
        localStorage.setItem('project',JSON.stringify(itemSave))
        dispatch(setProject(item))
        navigate(config.routes.backlog)

    }
    const renderTableBody = () => {
        return tableBody.map((item) => {
            return (
                <tr key={item.id} className="row-data c-pointer row-item"
                >
                    <td className="col-info">
                        <div className="info">{item.name}</div>
                    </td>
                    <td className="col-txt">{item.id}</td>
                    <td className="col-txt">{`${item.created_by.first_name} ${item.created_by.last_name}`}</td>
                    <td className="col-txt">{`${item.status===0?'Đang Triển Khai':item.status===1?'Hoàn Thành':'Dừng'}`}</td>
                    <td className="col-action">
                        {
                            item.status!==2 && (
                                <button
                                    id="show-user"
                                    onClick={() => handleChosenProject(item)}
                                    className="btn-show"
                                >
                                    <FaEye className="icon-show"/>
                                </button>
                            )
                        }
                        {
                            item.status!==1 && editItem &&  (
                                <button
                                    onClick={
                                        (e) => handleEditProject(item)
                                    }
                                    className=" btn-edit"
                                >
                                    <FaPen className="icon-edit"/>
                                </button>
                            )
                        }
                        {item.status===0 && deleteItem && (
                            <button
                                onClick={(e) => {
                                    showConfirmDeleteProject(e, item);
                                }}
                                className="btn-delete"
                            >
                                <FaTimesCircle className="icon-delete"/>
                            </button>
                        )}

                    </td>
                </tr>
            );
        });
    };
    return (
        <div className="table-project">
            <TableLayout tableHeader={tableHeader} tableBody={renderTableBody()}/>
            <ConfirmModal title="Xác Nhận Dừng Dự Án"
                          open={showPopupDelete.show}
                          content={`Bạn Có Thực Sự Muốn Dừng Dự Án Này Không ? `}
                          textOK="Xóa"
                          textCancel="Hủy"
                          onOK={() => handleRemoveProject(showPopupDelete.project)}
                          onCancel={(e) => setShowPopupDelete({...showPopupDelete, show: false})}/>

        </div>
    );
}

export default ProjectTable;