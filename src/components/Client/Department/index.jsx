import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import TableLayout from "~/components/commoms/Table";
import {FaExclamationTriangle, FaEye, FaPen, FaQuestionCircle, FaTimesCircle} from "react-icons/fa";
import ImageCustom from "~/components/commoms/Image";
import {Button, Modal} from "antd";
import {useDispatch} from "react-redux";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {setDepartment, setIsEdit} from "~/redux/reducer/department/departmentReducer";

DepartmentTable.propTypes = {};

function DepartmentTable({tableHeader, tableBody}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailDepartment, setDetailDepartment] = useState({});
    const [isColoseModal, setIsColoseModal] = useState(false);
    const [showPopupDelete, setShowPopupDelete] = useState({
        department_id: null,
        show: false,
    });
    const dispatch = useDispatch()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleShowDetailDepartment = (user) => {
        // setIsModalOpen(true);
        // setDetailDepartment(user)
        dispatch(setDepartment(user))
    }
    const handleEditDepartment = async (e, id) => {
        // e.stopPropagation();
        // const data = await getDepartmentById(id);
        // if (Object.keys(data).length > 0) {
        //     dispatch(setDepartment(data));
        dispatch(setIsEdit(true));
        // } else if (data === 401) {
        //     Notiflix.Block.remove('#root');
        // } else {
        //     Notiflix.Block.remove('#root');
        //     ErrorToast('Something went wrong. Please try again', 3000);
        // }
    };
    const handleRemoveDepartment = async (id) => {
        //e.stopPropagation();
        // const result = await deleteDepartment(id);
        // console.log('result', result);
        // if (result === 200) {
        //     SuccessToast('Remove department successfully', 3000);
        // } else if (result === 404) {
        //     ErrorToast('Remove departments unsuccessfully', 3000);
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

    const showConfirmDeleteDepartment = (e, id) => {
        e.stopPropagation();
        setShowPopupDelete({department_id: id, show: true});
    };
    const renderTableBody = () => {
        return tableBody.map((item) => {
            return (
                <tr key={item.id} className="row-data c-pointer row-item"

                >

                    <td className="col-txt">{item.id}</td>

                    <td className="col-txt">
                        {item.name}
                    </td>
                    <td className={'text-status'}>
                        <p
                            className={` ${
                                item.status === 1 ? 'active' : 'disabled '
                            }`}
                        >
                            {item.status === 1 ? 'Đang Hoạt Động' : 'Tạm Dừng'}
                        </p>
                    </td>
                    <td className="col-action">
                        {/*<button*/}
                        {/*    id="show-user"*/}
                        {/*    onClick={() => handleShowDetailDepartment(item)}*/}
                        {/*    className="btn-show"*/}
                        {/*>*/}
                        {/*    <FaEye className="icon-show"/>*/}
                        {/*</button>*/}
                        <button
                            id="edit-department"
                            onClick={(e) => handleEditDepartment(e, item.id)}
                            className=" btn-edit"
                        >
                            <FaPen className="icon-edit"/>
                        </button>
                        <button
                            id="disabled-user"
                            onClick={(e) => {
                                showConfirmDeleteDepartment(e, item.id);
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
        <div className="table-department">
            <TableLayout tableHeader={tableHeader} tableBody={renderTableBody()}/>

            <Modal title="Thông Tin Nhân Viên" open={isModalOpen}

                   maskClosable={true}
                   onCancel={handleCancel}
                   footer={null}
                   width={1100}
                   style={{top: 20}}
            >
                {/*{<DetailDepartment user={detailDepartment}/>}*/}
            </Modal>
            <ConfirmModal title="Xác Nhận Xóa"
                          open={showPopupDelete.show}
                          content={`Bạn Có Thực Sự Muốn Xóa Nhân Viên Này Không ? `}
                          textOK="Xóa"
                          textCancel="Hủy"
                          onOK={() => handleRemoveDepartment(showPopupDelete.department_id)}
                          onCancel={(e) => setShowPopupDelete({...showPopupDelete, show: false})}/>

        </div>
    );
}

export default DepartmentTable;