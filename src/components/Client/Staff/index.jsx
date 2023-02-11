import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import TableLayout from "~/components/commoms/Table";
import {FaPen, FaTimesCircle} from "react-icons/fa";
import ImageCustom from "~/components/commoms/Image";
import {Button, Modal} from "antd";
import DetailStaff from "~/components/Client/Staff/DetailStaff";
StaffTable.propTypes = {

};

function StaffTable({tableHeader,tableBody}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailStaff,setDetailStaff] = useState({});
    const [isColoseModal,setIsColoseModal] = useState(false);
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
                               // onClick={(e) => handleEditStaff(e, item.id)}
                                className=" btn-action"
                            >
                                <FaPen className="icon-edit" />
                            </button>
                            <button
                                id="disabled-user"
                                onClick={(e) => {
                               //     showConfirmDeleteStaff(e, item.id);
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

                       >
                    {<DetailStaff user={detailStaff} />}
                </Modal>
            </div>
    );
}

export default StaffTable;