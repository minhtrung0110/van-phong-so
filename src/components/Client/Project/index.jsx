import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import TableLayout from "~/components/commoms/Table";
import {FaPen, FaTimesCircle} from "react-icons/fa";
import ConfirmModal from "~/components/commoms/ConfirmModal";
ProjectTable.propTypes = {

};

function ProjectTable({tableHeader, tableBody}) {
    console.log(tableBody)
    const [showPopupDelete, setShowPopupDelete] = useState({
        project_id: null,
        show: false,
    });
    const showConfirmDeleteProject = (e, id) => {
        e.stopPropagation();
        setShowPopupDelete({project_id: id, show: true});
    };
    const handleEditProject= async (e, id) => {


    };
    const handleRemoveProject = async (id) => {
        //e.stopPropagation();
        // const result = await deleteStaff(id);
        // console.log('result', result);
        // if (result === 200) {
        //     SuccessToast('Remove staff successfully', 3000);
        // } else if (result === 404) {
        //     ErrorToast('Remove staffs unsuccessfully', 3000);
        //     Notiflix.Block.remove('#root');
        // } else if (result === 401) {
        //     Notiflix.Block.remove('#root');
        // } else {
        //     Notiflix.Block.remove('#root');
        //     ErrorToast('Something went wrong. Please try again', 3000);
        // }
        setShowPopupDelete({...showPopupDelete, show: false});
        // dispatch(setIsReset(Math.random()));
    };
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
                            id="edit-project"
                            onClick={
                          (e) => handleEditProject(e, item.id)
                                }
                            className=" btn-edit"
                        >
                            <FaPen className="icon-edit"/>
                        </button>
                        <button
                            id="disabled-user"
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