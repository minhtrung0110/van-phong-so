import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import TableLayout from "~/components/commoms/Table";
import {FaPen,FaTimesCircle} from "react-icons/fa";
import {useDispatch} from "react-redux";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {setGroup, setIsEdit} from "~/redux/reducer/group/groupReducer";
import {Modal} from "antd";
import EditGroup from "~/components/Client/Group/Edit";
import async from "async";


GroupTable.propTypes = {};

function GroupTable({tableHeader, tableBody,onUpdate,onDelete}) {
    const [showEdit, setShowEdit] = useState(false);
    const [showPopupDelete, setShowPopupDelete] = useState({
        group_id: null,
        show: false,
    });
    const dispatch = useDispatch()
    const handleEditGroup = (e,item) => {
        e.stopPropagation();
        dispatch(setGroup(item));
        setShowEdit(true)
    };
    const handleRemoveGroup = async (id) => {
        setShowPopupDelete({...showPopupDelete, show: false});
        onDelete(showPopupDelete.group_id)
    };
    const showConfirmDeleteGroup = (e, item) => {
        e.stopPropagation();
        setShowPopupDelete({group_id: item.id,name:item.name, show: true});
    };
    const handleCancelEditGroup = ()=>{
        setShowEdit(false)
        dispatch(setGroup(null));
    }
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
                                item.status === 1 ? 'active' : 'negative '
                            }`}
                        >
                            {item.status === 1 ? 'Đang Hoạt Động' : 'Tạm Dừng'}
                        </p>
                    </td>
                    <td className="col-action">
                        <button
                            id="edit-group"
                            onClick={(e) => handleEditGroup(e,item)}
                            className=" btn-edit"
                        >
                            <FaPen className="icon-edit"/>
                        </button>
                        <button
                            id="disabled-user"
                            onClick={(e) => {
                                showConfirmDeleteGroup(e, item);
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
        <div className="table-group">
            <TableLayout tableHeader={tableHeader} tableBody={renderTableBody()}/>
            <Modal title="Chỉnh Sửa Nhóm" open={showEdit}
                   maskClosable={true}
                   destroyOnClose={true}
                   onCancel={(handleCancelEditGroup)}
                   footer={null}
                   width={700}
                   style={{top: 150}}
            >
                <EditGroup onCancel={handleCancelEditGroup} onSave={onUpdate} />
            </Modal>

            <ConfirmModal title="Xác Nhận Xóa"
                          open={showPopupDelete.show}
                          content={<div dangerouslySetInnerHTML={{__html: `Bạn Có Chắc Chắn Muốn Xóa <strong>${showPopupDelete.name}</strong>  ? `}} />}
                          textOK="Xóa"
                          textCancel="Hủy"
                          onOK={() => handleRemoveGroup(showPopupDelete.group_id)}
                          onCancel={(e) => setShowPopupDelete({...showPopupDelete, show: false})}/>
        </div>
    );
}

export default GroupTable;