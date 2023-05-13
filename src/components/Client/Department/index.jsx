import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import TableLayout from "~/components/commoms/Table";
import {FaEye, FaPen, FaTimesCircle} from "react-icons/fa";
import {useDispatch} from "react-redux";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {setDepartment, setIsEdit,setIsReset} from "~/redux/reducer/department/departmentReducer";
import {config} from "~/config";
import {useNavigate} from "react-router-dom";
import {deleteDepartment, getDepartmentById} from "~/api/Client/Department/departmentAPI";
import {message} from "antd";
import {deleteStaff} from "~/api/Client/Staff/staffAPI";


DepartmentTable.propTypes = {};

function DepartmentTable({tableHeader, tableBody,onDelete}) {
    const [messageApi, contextHolder] = message.useMessage();
    const [showPopupDelete, setShowPopupDelete] = useState({
        department_id: null,
        show: false,
    });
    const dispatch = useDispatch()
    const handleEditDepartment = async (e, item) => {
        e.stopPropagation();
        const data = await getDepartmentById(item.ID);
        console.log('Data nhận :', data)
        if (Object.keys(data).length > 0) {
            dispatch(setDepartment(data));
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
    const handleRemoveDepartment = async (id) => {
        const result = await deleteDepartment(id);
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

    const showConfirmDeleteDepartment = (e, item) => {
        e.stopPropagation();
        setShowPopupDelete({department_id: item.id,name:item.name, show: true});
    };
    const navigate=useNavigate();
    const navigateGroupPage = (item) => {
        dispatch(setDepartment(item))
        navigate(config.routes.group)

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
                        >                            {item.status === 1 ? 'Đang Hoạt Động' : 'Tạm Dừng'}
                        </p>
                    </td>
                    <td className="col-action">
                        <button
                            id="show-user"
                           onClick={() => navigateGroupPage(item)}
                            className="btn-show"
                        >
                            <FaEye className="icon-show"/>
                        </button>
                        <button
                            id="edit-department"
                            onClick={(e) => handleEditDepartment(e,item)}
                            className=" btn-edit"
                        >
                            <FaPen className="icon-edit"/>
                        </button>
                        <button
                            id="disabled-user"
                            onClick={(e) => {
                                showConfirmDeleteDepartment(e, item);
                            }}
                            className="btn-delete"
                        >
                            <FaTimesCircle className="icon-delete"/>
                        </button>

                    </td>
                    {contextHolder}
                </tr>
            );
        });
    };

    return (
        <div className="table-department">
            <TableLayout tableHeader={tableHeader} tableBody={renderTableBody()}/>


            <ConfirmModal title="Xác Nhận Xóa"
                          open={showPopupDelete.show}
                          content={<div dangerouslySetInnerHTML={{__html: `Bạn Có Chắc Chắn Muốn Xóa Phòng <strong>${showPopupDelete.name}</strong>  ? `}} />}
                          textOK="Xóa"
                          textCancel="Hủy"
                          onOK={() => handleRemoveDepartment(showPopupDelete.department_id)}
                          onCancel={(e) => setShowPopupDelete({...showPopupDelete, show: false})}/>
        </div>
    );
}

export default DepartmentTable;