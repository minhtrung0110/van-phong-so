import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {Col, DatePicker, Form, Input, Row, Select, Tabs} from "antd";
import AutoSendMail from "~/components/commoms/AutoSendMail";
import AutoCallPhone from "~/components/commoms/AutoCallPhone";
import {FaBirthdayCake, FaChair, FaFemale, FaHome, FaMailBulk, FaMap, FaPhone, FaUser} from "react-icons/fa";
import {Option} from "antd/es/mentions";
import HeaderContent from "~/components/commoms/HeaderContent";
DetailStaff.propTypes = {

};
const contentPrevie=(key) =>(
    <div className="content" key={key}>
        25+5={key}
    </div>
)
function DetailStaff( {user}) {
    const [size, setSize] = useState('small');
    const onChange = (e) => {
        setSize(e.target.value);
    };
    return (
        <div className="detail-staff">
            <HeaderContent title='Thông Tin Chi Tiet Nhân Viên' />
            <Row className='box-detail-staff'  gutter={{ xs: 8, sm: 16, lg: 24}}>
                <Col className='' xs={{ span: 24}} lg={{ span: 8}}>
                    <div className=' basic-info'>
                        <Form.Item
                            name="fisrtName"
                            label="Họ và Tên lót"
                            tooltip="Điền đầy đủ - chính xác thông tin này"
                            className='gr-ip-e-s'
                            labelAlign='left'

                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền họ và tên lót',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input  size="large" name='' />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            label="Tên"
                            tooltip="Điền đầy đủ - chính xác thông tin này"
                            className='gr-ip-e-s'
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền tên !',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="large" name=''/>
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Giới Tính"
                            tooltip=" "
                            className='gr-ip-e-s'
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn giới tính',
                                },
                            ]}
                        >
                            <Select placeholder="Chon giới tính" size="large" name=''>
                                <Option value="male">Nam</Option>
                                <Option value="female">Nữ</Option>
                                <Option value="other">OKhác</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="birthDate"
                            label="Ngày Sinh"
                            tooltip=" "
                            className='gr-ip-e-s'
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn ngày sinh',
                                },
                            ]}
                        >
                            <DatePicker placeholder="Chon ngày sinh"  size="large" name=''/>
                        </Form.Item>
                    </div>
                </Col>
                <Col className='basic-advance' xs={{ span: 24 }} lg={{ span: 16 }}>
                    <div>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            tooltip="Điền đầy đủ - chính xác thông tin này"
                            className='gr-ip-e-s'
                            labelAlign='left'
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng điền địa chỉ E-mail!',
                                },
                            ]}
                        >
                            <Input size="large" name=''/>
                        </Form.Item>
                    </div>
                </Col>
            </Row>
        </div>

    );
}

export default DetailStaff;