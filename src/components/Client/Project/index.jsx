import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import TableLayout from "~/components/commoms/Table";
import {FaEye, FaPen, FaTimesCircle} from "react-icons/fa";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {Modal} from "antd";
import AddProject from "~/components/Client/Project/Add";
import EditProject from "~/components/Client/Project/EditProject";
import {useDispatch} from "react-redux";
import {setKeyProject, setProject} from "~/redux/reducer/project/projectReducer";
import {useNavigate, useNavigation} from "react-router-dom";
import {config} from "~/config";
ProjectTable.propTypes = {

};

function ProjectTable({tableHeader, tableBody,onUpdate,onDelete}) {

    const [showPopupDelete, setShowPopupDelete] = useState({
        project_id: null,
        show: false,
    });
    const [showPopupUpdate, setShowPopupUpdate] = useState({
        project: {},
        show: false,
    });
    const dispatch =useDispatch()
    const navigation=useNavigate()
    const showConfirmDeleteProject = (e, id) => {
        e.stopPropagation();
        setShowPopupDelete({project_id: id, show: true});
    };
    const handleEditProject=  (item) => {
        setShowPopupUpdate({
            project: item,
            show: true
        })

    };
    const handleUpdateProject=(data)=>{
        setShowPopupUpdate({  project: null,
            show: false,})
        onUpdate(data)
    }
    const handleCancelUpdateProject=()=>{
        setShowPopupUpdate({...showPopupUpdate,show: false});
    }
    const handleRemoveProject = (id) => {
        setShowPopupDelete({...showPopupDelete, show: false});
        onDelete(showPopupDelete.project_id)
    };

    const handleChosenProject=(item)=>{
        const itemSave={projectId: item.id,currentSprint:null}
        localStorage.setItem('project',JSON.stringify(itemSave))
        dispatch(setProject(item))
        navigation(config.routes.backlog)

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
                    <td className="col-txt">{`${item.leader.first_name} ${item.leader.last_name}`}</td>
                    <td className="col-action">
                        <button
                            id="show-user"
                            onClick={() => handleChosenProject(item)}
                            className="btn-show"
                        >
                            <FaEye className="icon-show"/>
                        </button>
                        <button
                            onClick={
                          (e) => handleEditProject(item)
                                }
                            className=" btn-edit"
                        >
                            <FaPen className="icon-edit"/>
                        </button>
                        <button
                            onClick={(e) => {
                               showConfirmDeleteProject(e, item.id);
                            }}
                            className="btn-delete"
                        >
                            <FaTimesCircle className="icon-delete"/>
                        </button>

                    </td>
                </tr>
            );
        });
    };
    return (
        <div className="table-project">
            <TableLayout tableHeader={tableHeader} tableBody={renderTableBody()}/>
            <Modal
                title="Cập Nhật Dự Án"
                onCancel={handleCancelUpdateProject}
                footer={null
                }
                width={500}
                style={{ top: 100   }}
                bodyStyle={{height: "400px"}}

                open={showPopupUpdate.show}
            >
                <EditProject project={showPopupUpdate.project} onCancel={handleCancelUpdateProject} onSave={handleUpdateProject} />
            </Modal>
            <ConfirmModal title="Xác Nhận Xóa"
                          open={showPopupDelete.show}
                          content={`Bạn Có Thực Sự Muốn Xóa Dự Án Này Không ? `}
                          textOK="Xóa"
                          textCancel="Hủy"
                          onOK={() => handleRemoveProject(showPopupDelete.project_id)}
                          onCancel={(e) => setShowPopupDelete({...showPopupDelete, show: false})}/>

        </div>
    );
}

export default ProjectTable;