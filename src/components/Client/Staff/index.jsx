import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import TableLayout from "~/components/commoms/Table";
import {FaExclamationTriangle, FaPen, FaQuestionCircle, FaTimesCircle} from "react-icons/fa";
import ImageCustom from "~/components/commoms/Image";
import {Button, Modal} from "antd";
import DetailStaff from "~/components/Client/Staff/DetailStaff";
import {useDispatch} from "react-redux";
import {setIsEdit} from "~/redux/reducer/staff/staffReducer";
import ConfirmModal from "~/components/commoms/ConfirmModal";
StaffTable.propTypes = {

};

function StaffTable({tableHeader,tableBody}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailStaff,setDetailStaff] = useState({});
    const [isColoseModal,setIsColoseModal] = useState(false);
    const [showPopupDelete, setShowPopupDelete] = useState({
        staff_id: null,
        show: false,
    });
    const dispatch=useDispatch()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleShowDetailStaff=(user)=>{
        setIsModalOpen(true);
        setDetailStaff(user)
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
        setShowPopupDelete({ ...showPopupDelete, show: false });
       // dispatch(setIsReset(Math.random()));
    };

    const showConfirmDeleteStaff = (e, id) => {
        e.stopPropagation();
        setShowPopupDelete({ staff_id: id, show: true });
    };
    const renderTableBody = () => {
        return tableBody.map((item) => {
            return (
                <tr key={item.id} className="row-data c-pointer"
                    onClick={()=>handleShowDetailStaff(item)}
                >
                    <td>
                        <ImageCustom type="avatar" src={item.avatar} />
                    </td>
                    <td className="col-txt">
                        {`${item.first_name} ${item.last_name}`}
                        <small className="sub-txt">Gender: {item.gender}</small>
                    </td>
                    <td className="col-txt">{item.role}</td>

                    <td className="col-txt">
                        Email:<span className="col-txt-md">{`  ${item.mail} `}</span> <br />
                        Phone: <span className="col-txt-md">{`  ${item.phone_number} `}</span>
                    </td>

                    <td>
                        <p
                            className={`text-center border-radius-2px ${
                                item.status === 1 ? 'bg-success-100 text-success' : 'bg-red-100 text-red '
                            }`}
                        >
                            {item.status === 1 ? 'Active' : 'Disabled'}
                        </p>
                    </td>
                    <td>
                        <div className="d-flex">
                            <button
                                id="edit-staff"
                               onClick={(e) => handleEditStaff(e, item.id)}
                                className=" btn-action"
                            >
                                <FaPen className="icon-edit" />
                            </button>
                            <button
                                id="disabled-user"
                                onClick={(e) => {
                                showConfirmDeleteStaff(e, item.id);
                                }}
                                className="btn-action"
                            >
                                <FaTimesCircle className="icon-delete" />
                            </button>
                        </div>
                    </td>
                </tr>
            );
        });
    };
    return (
            <div className="table-staff" >
                <TableLayout tableHeader={tableHeader} tableBody={renderTableBody()} />

                <Modal title="Thông Tin Nhân Viên" open={isModalOpen}

                       maskClosable={true}
                        onCancel={handleCancel}
                       footer={null}
                       width={1100}
                       style={{ top: 20 }}
                       >
                    {<DetailStaff user={detailStaff} />}
                </Modal>
                <ConfirmModal title="Xác Nhận Xóa"
                              open={showPopupDelete.show}
                              content={`Bạn Có Thực Sự Muốn Xóa Nhân Viên Này Không ? `}
                              textOK="Xóa"
                              textCancel="Hủy"
                              onOK={()=>handleRemoveStaff(showPopupDelete.staff_id)}
                              onCancel={(e) => setShowPopupDelete({ ...showPopupDelete, show: false })} />

            </div>
    );
}

export default StaffTable;