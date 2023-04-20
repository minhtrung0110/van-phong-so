import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import TableLayout from "~/components/commoms/Table";
import {FaExclamationTriangle, FaEye, FaPen, FaQuestionCircle, FaTimesCircle} from "react-icons/fa";
import ImageCustom from "~/components/commoms/Image";
import {Button, Modal} from "antd";
import DetailStaff from "~/components/Client/Staff/DetailStaff";
import {useDispatch} from "react-redux";
import {setIsEdit, setStaff} from "~/redux/reducer/staff/staffReducer";
import ConfirmModal from "~/components/commoms/ConfirmModal";

StaffTable.propTypes = {};

function StaffTable({tableHeader, tableBody}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailStaff, setDetailStaff] = useState({});
    const [isColoseModal, setIsColoseModal] = useState(false);
    const [showPopupDelete, setShowPopupDelete] = useState({
        staff_id: null,
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
    const handleShowDetailStaff = (user) => {
       // setIsModalOpen(true);
       // setDetailStaff(user)
        dispatch(setStaff(user))
    }
    const handleEditStaff = async (e, id) => {
        // e.stopPropagation();
        // const data = await getStaffById(id);
        // if (Object.keys(data).length > 0) {
        //     dispatch(setStaff(data));
        dispatch(setIsEdit(true));
        // } else if (data === 401) {
        //     Notiflix.Block.remove('#root');
        // } else {
        //     Notiflix.Block.remove('#root');
        //     ErrorToast('Something went wrong. Please try again', 3000);
        // }
    };
    const handleRemoveStaff = async (id) => {
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

    const showConfirmDeleteStaff = (e, id) => {
        e.stopPropagation();
        setShowPopupDelete({staff_id: id, show: true});
    };
    const renderTableBody = () => {
        return tableBody.map((item) => {
            return (
                <tr key={item.id} className="row-data c-pointer row-item"

                >
                    <td className="col-info">
                        <ImageCustom type="avatar" src={item.avatar} className={'avatar'}/>
                        <div className="info">
                            {`${item.first_name} ${item.last_name}`}
                            <small className="sub-txt">Gender: {item.gender}</small>
                        </div>
                    </td>
                    <td className="col-txt">{item.role}</td>

                    <td className="col-txt">
                        Email:<span className="col-txt-md">{`  ${item.mail} `}</span> <br/>
                        Phone: <span className="col-txt-md">{`  ${item.phone_number} `}</span>
                    </td>

                    <td className={'text-status'}>
                        <p
                            className={` ${
                                item.status === 1 ? 'active' : 'negative '
                            }`}
                        >
                            {item.status === 1 ? 'Đang Làm Việc' : 'Thôi Việc'}
                        </p>
                    </td>
                    <td className="col-action">
                            <button
                                id="show-user"
                                    onClick={() => handleShowDetailStaff(item)}
                                className="btn-show"
                            >
                                <FaEye className="icon-show"/>
                            </button>
                            <button
                                id="edit-staff"
                                onClick={(e) => handleEditStaff(e, item.id)}
                                className=" btn-edit"
                            >
                                <FaPen className="icon-edit"/>
                            </button>
                            <button
                                id="disabled-user"
                                onClick={(e) => {
                                    showConfirmDeleteStaff(e, item.id);
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
        <div className="table-staff">
            <TableLayout tableHeader={tableHeader} tableBody={renderTableBody()}/>

            <Modal title="Thông Tin Nhân Viên" open={isModalOpen}
                   maskClosable={true}
                   onCancel={handleCancel}
                   footer={null}
                   width={1100}
                   style={{top: 20}}
            >
                {<DetailStaff user={detailStaff}/>}
            </Modal>
            <ConfirmModal title="Xác Nhận Xóa"
                          open={showPopupDelete.show}
                          content={`Bạn Có Thực Sự Muốn Xóa Nhân Viên Này Không ? `}
                          textOK="Xóa"
                          textCancel="Hủy"
                          onOK={() => handleRemoveStaff(showPopupDelete.staff_id)}
                          onCancel={(e) => setShowPopupDelete({...showPopupDelete, show: false})}/>

        </div>
    );
}

export default StaffTable;