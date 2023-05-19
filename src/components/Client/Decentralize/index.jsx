import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import TableLayout from "~/components/commoms/Table";
import {FaPen,FaTimesCircle} from "react-icons/fa";
import {useDispatch} from "react-redux";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {setDecentralize,setIsEdit} from "~/redux/reducer/decentralize/decentralizeReducer";
import {getDepartmentById} from "~/api/Client/Department/departmentAPI";
import {setDepartment} from "~/redux/reducer/department/departmentReducer";
import {message} from "antd";
import {getRoleById} from "~/api/Client/Role/roleAPI";


DecentralizeTable.propTypes = {};

function DecentralizeTable({tableHeader, tableBody,onDelete,onUpdate}) {
    const [showPopupDelete, setShowPopupDelete] = useState({
        department_id: null,
        name:'',
        show: false,
    });
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const handleEditDecentralize = async (item) => {
        const data = await getRoleById(item.id);
        console.log('Data nhận :', data)
        if (Object.keys(data).length > 0) {
            dispatch(setIsEdit(true));
            dispatch(setDecentralize({...data.data,id: item.id}));
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
    const handleConfirmDelete=(id)=>{
        setShowPopupDelete({...showPopupDelete, show: false});
        onDelete(id);
    }


    const showConfirmDeleteDecentralize = (e, item) => {
        e.stopPropagation();
        setShowPopupDelete({department_id: item.id,name:item.title, show: true});
    };
    const renderTableBody = () => {
        return tableBody.map((item) => {
            return (
                <tr key={item.id} className="row-data c-pointer row-item"

                >
                    {contextHolder}

                    <td className="col-txt">{item.id}</td>

                    <td className="col-txt">
                        {item.title}
                    </td>
                    <td className={'text-status'}>
                        <p
                            className={` ${
                                item.status === true ? 'active' : 'negative '
                            }`}
                        >
                            {item.status === true ? 'Đang Hoạt Động' : 'Tạm Dừng'}
                        </p>
                    </td>
                    <td className="col-action">
                        <button
                            id="edit-department"
                            onClick={() => handleEditDecentralize(item)}
                            className=" btn-edit"
                        >
                            <FaPen className="icon-edit"/>
                        </button>
                        <button
                            id="disabled-user"
                            onClick={(e) => {
                                showConfirmDeleteDecentralize(e, item);
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


            <ConfirmModal title="Xác Nhận Vô Hiệu Hóa Quyền"
                          open={showPopupDelete.show}
                          content={<div dangerouslySetInnerHTML={{__html: `Bạn Có Chắc Chắn Muốn Vô Hiệu Hóa Quyền <strong>${showPopupDelete.name}</strong>  ? `}} />}
                          textOK="Xóa"
                          textCancel="Hủy"
                          onOK={() => handleConfirmDelete(showPopupDelete.department_id)}
                          onCancel={(e) => setShowPopupDelete({...showPopupDelete, show: false})}/>
        </div>
    );
}

export default DecentralizeTable;