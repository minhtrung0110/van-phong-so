import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import TableLayout from "~/components/commoms/Table";
import {FaEye, FaPen, FaTimesCircle} from "react-icons/fa";
import ImageCustom from "~/components/commoms/Image";
import {message, Modal} from "antd";
import DetailStaff from "~/components/Client/Staff/DetailStaff";
import {useDispatch} from "react-redux";
import {setIsEdit, setStaff, setIsReset} from "~/redux/reducer/staff/staffReducer";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {deleteStaff, getStaffById} from "~/api/Client/Staff/staffAPI";

StaffTable.propTypes = {};

function StaffTable({tableHeader, tableBody}) {
    console.log(tableBody)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailStaff, setDetailStaff] = useState({});
    const [showPopupDelete, setShowPopupDelete] = useState({
        staff_id: null,
        show: false,
    });
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleShowDetailStaff = (user) => {
        setIsModalOpen(true);
        setDetailStaff(user)
        dispatch(setStaff(user))
    }
    const handleEditStaff = async (e, id) => {
        e.stopPropagation();
        const data = await getStaffById(id);
        console.log('Data nhận :', data)
        if (Object.keys(data).length > 0) {
            dispatch(setStaff(data));
            dispatch(setIsEdit(true));
        } else if (data === 401) {
            //   //  Notiflix.Block.remove('#root');
        } else {
            //    // Notiflix.Block.remove('#root');
            messageApi.open({
                type: 'error',
                content: 'Cập nhật thất bại',
                duration: 1.3,
            });
        }
    };
    const handleRemoveStaff = async (id) => {
        const result = await deleteStaff(id);
        //  console.log('result', result);
        if (result.status === 1) {
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
        } else if (result.status === 0) {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.3,
            });
        }
        setShowPopupDelete({...showPopupDelete, show: false});
        dispatch(setIsReset(Math.random()));
    };

    const showConfirmDeleteStaff = (e, id) => {
        e.stopPropagation();
        setShowPopupDelete({staff_id: id, show: true});
    };
    const renderTableBody = () => {
        return tableBody.map((item) => {
            return (
                <tr key={item.ID} className="row-data c-pointer row-item"

                >
                    <td className="col-info">
                        <ImageCustom type="avatar" src={item.avatar_url} className={'avatar'}/>
                        {/*<AvatarCustom avatar={item.avatar_url} lastName={item.full_name} size={'large'} className={'avatar'}/>*/}
                        <div className="info">
                            {item.full_name}
                            <small className="sub-txt">Giới tính: {item.sex === 'male' ? 'nam' : 'nữ'}</small>
                        </div>
                    </td>
                    <td className="col-txt">{item.role_name}</td>

                    <td className="col-txt">
                        Email:<span className="col-txt-md">{`  ${item.email} `}</span> <br/>
                        Điện Thoại: <span className="col-txt-md">{`  ${item.phone_number} `}</span>
                    </td>

                    <td className={'text-status'}>
                        <p
                            className={` ${
                                item.status === '1' ? 'active' : 'negative '
                            }`}
                        >
                            {item.status === '1' ? 'Đang Làm Việc' : 'Thôi Việc'}
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
                            onClick={(e) => handleEditStaff(e, item.ID)}
                            className=" btn-edit"
                        >
                            <FaPen className="icon-edit"/>
                        </button>
                        <button
                            id="disabled-user"
                            onClick={(e) => {
                                showConfirmDeleteStaff(e, item.ID);
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
            {contextHolder}
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
            <ConfirmModal title="Xác Nhận Thôi Việc"
                          open={showPopupDelete.show}
                          content={`Bạn Có Thực Sự Muốn Cho Nhân Viên Này Thôi Việc ? `}
                          textOK="Xóa"
                          textCancel="Hủy"
                          onOK={() => handleRemoveStaff(showPopupDelete.staff_id)}
                          onCancel={(e) => setShowPopupDelete({...showPopupDelete, show: false})}/>

        </div>
    );
}

export default StaffTable;