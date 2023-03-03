import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import TableLayout from "~/components/commoms/Table";
import {FaPen,FaTimesCircle} from "react-icons/fa";
import {useDispatch} from "react-redux";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import {setDepartment, setIsEdit} from "~/redux/reducer/department/departmentReducer";


DepartmentTable.propTypes = {};

function DepartmentTable({tableHeader, tableBody}) {
    const [showPopupDelete, setShowPopupDelete] = useState({
        department_id: null,
        name:'',
        show: false,
    });
    const dispatch = useDispatch()
    const handleEditDepartment = (e,item) => {
        e.stopPropagation();
        dispatch(setIsEdit(true));
        dispatch(setDepartment(item));
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

    const showConfirmDeleteDepartment = (e, item) => {
        e.stopPropagation();
        setShowPopupDelete({department_id: item.id,name:item.name, show: true});
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
                                item.status === 1 ? 'active' : 'negative '
                            }`}
                        >
                            {item.status === 1 ? 'Đang Hoạt Động' : 'Tạm Dừng'}
                        </p>
                    </td>
                    <td className="col-action">
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
                </tr>
            );
        });
    };

    return (
        <div className="table-department">
            <TableLayout tableHeader={tableHeader} tableBody={renderTableBody()}/>


            <ConfirmModal title="Xác Nhận Xóa"
                          open={showPopupDelete.show}
                          content={`Bạn Có Thực Sự Muốn Xóa ${showPopupDelete.name} Này Không ? `}
                          textOK="Xóa"
                          textCancel="Hủy"
                          onOK={() => handleRemoveDepartment(showPopupDelete.department_id)}
                          onCancel={(e) => setShowPopupDelete({...showPopupDelete, show: false})}/>
        </div>
    );
}

export default DepartmentTable;