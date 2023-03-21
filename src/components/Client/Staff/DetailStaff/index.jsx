import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {Button, Col, DatePicker, Form, Input, Row, Select, Tabs} from "antd";
import AutoSendMail from "~/components/commoms/AutoSendMail";
import AutoCallPhone from "~/components/commoms/AutoCallPhone";
import {
    FaAngleLeft, FaArrowLeft,
    FaBirthdayCake,
    FaChair,
    FaCut, FaDotCircle,
    FaFemale,
    FaHome, FaLock,
    FaMailBulk,
    FaMap,
    FaPhone,
    FaRecycle, FaTrashAlt,
    FaUser
} from "react-icons/fa";
import {Option} from "antd/es/mentions";
import HeaderContent from "~/components/commoms/HeaderContent";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import ImageCustom from "~/components/commoms/Image";
import {useDispatch, useSelector} from "react-redux";
import {staffSelector} from "~/redux/selectors/staff/staffSelector";
import TabPane from "antd/lib/tabs/TabPane";
import {setStaff} from "~/redux/reducer/staff/staffReducer";

DetailStaff.propTypes = {};
const contentPrevie = (key) => (
    <div className="content" key={key}>
        25+5={key}
    </div>
)

function DetailStaff({user}) {
    const staff = useSelector(staffSelector)
    console.log(staff)
    const [isDeleted, setIsDeleted] = useState(false)
    const [isCut, setIsCut] = useState(false)
    const [tab, setTab] = useState(false)
    const dispatch=useDispatch()
    const onChange = (key) => {
        console.log(key);
    };
    useEffect(()=>{

    },[dispatch])
    const handleBackStaffPage=()=>{
            dispatch(setStaff({}))
    }
    const items = [
        {
            key: '1',
            label: `Thông Tin Cơ Bản`,
        },
        {
            key: '2',
            label: `Thông Tin Công Việc`,
        },
        {
            key: '3',
            label: `Thông Tin Bổ Sung`,
        },
    ];
    const TabBasicInfo = () => {
        return (
            <Row className='list-info'>
                <Col className='left' xs={{span: 24}} lg={{span: 12}}>
                    <div className='group'>
                        <div className='title'>Email:</div>
                        <div className='content'>{staff.mail}</div>
                    </div>
                    <div className='group'>
                        <div className='title'>Tiêu đề:</div>
                        <div className='content'>nội dung</div>
                    </div>
                    <div className='group'>
                        <div className='title'>Tiêu đề:</div>
                        <div className='content'>nội dung</div>
                    </div>
                    <div className='group'>
                        <div className='title'>Tiêu đề:</div>
                        <div className='content'>nội dung</div>
                    </div>
                    <div className='group'>
                        <div className='title'>Tiêu đề:</div>
                        <div className='content'>nội dung</div>
                    </div>
                </Col>
                <Col className='right' xs={{span: 24}} lg={{span: 12}}>
                    <div className='group'>
                        <div className='title'>Email:</div>
                        <div className='content'>{staff.mail}</div>
                    </div>
                    <div className='group'>
                        <div className='title'>Tiêu đề:</div>
                        <div className='content'>nội dung</div>
                    </div>
                    <div className='group'>
                        <div className='title'>Tiêu đề:</div>
                        <div className='content'>nội dung</div>
                    </div>
                    <div className='group'>
                        <div className='title'>Tiêu đề:</div>
                        <div className='content'>nội dung</div>
                    </div>
                    <div className='group'>
                        <div className='title'>Tiêu đề:</div>
                        <div className='content'>nội dung</div>
                    </div>
                    <div className='group'>
                        <div className='title'>Tiêu đề:</div>
                        <div className='content'>nội dung</div>
                    </div>
                </Col>


            </Row>
        )
    }

    return (
        <div className="detail-staff">
            <HeaderContent title='Thông Tin Chi Tiet Nhân Viên'
                           slot={
                               <div className='gr-button'>

                                   <button className='btn-disabled' onClick={() => setIsCut(true)}><FaCut/> Cho Thôi
                                       Việc
                                   </button>
                                   <button className='btn-delete' onClick={() => setIsDeleted(true)}><FaTrashAlt/> Xóa
                                       Nhân Viên
                                   </button>
                               </div>
                           }/>
            <Row className='box-detail-staff' gutter={{xs: 8, sm: 16, lg: 24}}>
                <Col className='' xs={{span: 24}} lg={{span: 8}}>
                    <div className=' basic-info'>
                        <div className='box-avatar-staff'>
                            <ImageCustom src={staff.avatar} className='avatar'/>
                        </div>
                        <div className="container-info">
                            <p className='name'>Lê Văn Nguyên Tu</p>
                            <Button type="dashed" block>
                                {staff.id}
                            </Button>
                            <span className='role'>Sale Person</span>
                            <span className={`status ${staff.status === 1 ? 'active' : 'negative'}`}>
                                <FaDotCircle className='icon'/>
                                <b>{staff.status === 1 ? 'Đang Làm Việc' : 'Thôi Việc'}</b>
                            </span>
                        </div>
                        <div className='list-info'>
                            <div className='group'>
                                <div className='title'>Email:</div>
                                <div className='content'>{staff.mail}</div>
                            </div>
                            <div className='group'>
                                <div className='title'>Số điện thoai:</div>
                                <div className='content'>{staff.phone_number}</div>
                            </div>
                            <div className='group'>
                                <div className='title'>Ngày sinh:</div>
                                <div className='content'>{staff.birth_date}</div>
                            </div>
                            <div className='group'>
                                <div className='title'>Giới tính:</div>
                                <div className='content'>{staff.gender}</div>
                            </div>
                            <div className='group'>
                                <div className='title'>Địa chỉ:</div>
                                <div className='content'>{staff.address}</div>
                            </div>

                            <div className='group'>
                                <div className='title'>Tiêu đề:</div>
                                <div className='content'>nội dung</div>
                            </div>
                            <div className='group'>
                                <div className='title'>Tiêu đề:</div>
                                <div className='content'>nội dung</div>
                            </div>
                            <div className='group'>
                                <div className='title'>Tiêu đề:</div>
                                <div className='content'>nội dung</div>
                            </div>
                            <div className='group'>
                                <div className='title'>Tiêu đề:</div>
                                <div className='content'>nội dung</div>
                            </div>
                            <div className='group'>
                                <div className='title'>Tiêu đề:</div>
                                <div className='content'>nội dung</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className='basic-advance' xs={{span: 24}} lg={{span: 16}}>
                    <div className='tab-ui'>
                        <div className='header-tab-ui'>

                        </div>
                        <Tabs
                            defaultActiveKey="1"
                            onChange={onChange}
                            style={{display: "flex", justifyContent: "center"}}
                            renderTabBar={(props) => <CustomTabBar {...props} tabs={items} />}
                        >
                            <Tabs.TabPane tab="Thông Tin Cơ Bàn" key="1">
                                <TabBasicInfo/>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Thông Tin Bô Sung" key="2">
                                Content of Tab Pane 2
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                    <div className='footer' >
                        <button className={'btn-back'} onClick={handleBackStaffPage}>
                            <FaArrowLeft className='icon' />
                            Quay Về </button>
                    </div>
                </Col>

            </Row>


            <ConfirmModal title='Xóa Nhân Viên' open={isDeleted} onCancel={() => setIsDeleted(false)}
                          content='Bạn đang chuẩn bị xóa thông tin của một nhân viên khỏi hệ thống. Hành động này không thể hoàn tác và sẽ gây mất mát dữ liệu vĩnh viễn. Bạn có chắc chắn muốn tiếp tục xóa ?'
                          textCancel='Hủy' textOK='Xóa'
            />
            <ConfirmModal title='Cho Nhân Viên Thôi Việc' open={isCut} onCancel={() => setIsCut(false)}
                          content='Bạn đang tiến hành cho nhân viên thôi việc. Hành động này sẽ gây ảnh hưởng các chính sách, quyền lợi và các ưu đãi khác được cung cấp bởi công ty. Vui lòng xác nhận lại quyết định của bạn trước khi tiếp tục'
                          textCancel='Hủy' textOK='Xác Nhận'
            />

        </div>

    );
}

export default DetailStaff;
function CustomTabBar({ activeKey, onTabClick, tabs }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center',borderBottom:'2px solid #dedede' }}>
            {tabs.map(tab => (
                <div
                    key={tab.key}
                    onClick={() => onTabClick(tab.key)}
                    style={{
                        padding: '8px',
                        width:'12rem',
                        height:'4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: tab.key === activeKey ? '#fff' : '#fff',
                        borderBottom: tab.key === activeKey ? '3px solid #479f87' : 'none',
                        color: tab.key === activeKey ? '#479f87' : '#dedede',
                        fontWeight: 'bold' ,
                        cursor: 'pointer',
                        fontSize:'1rem',

                    }}
                >
                    {tab.label}
                </div>
            ))}
        </div>
    );
}