import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio, Row,
    Select, Tooltip,
    TreeSelect
} from "antd";
import './style.scss'
import {FaEdit, FaPencilAlt} from "react-icons/fa";
import AutoCallPhone from "~/components/commoms/AutoCallPhone";
import AutoSendMail from "~/components/commoms/AutoSendMail";

BoxInfo.propTypes = {}
const {Option} = Select;

function BoxInfo(props) {
    const [isEdit, setIsEdit] = useState(false)
    const [isUser, setIsUser] = useState(true)
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="USD">$</Option>
                <Option value="CNY">¥</Option>
            </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };
    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));
    const residences = [
        {
            value: 'HCM',
            label: 'TP. Hồ Chí Minh',
            children: [
                {
                    value: 'Bình Chánh',
                    label: 'Bình Chánh',
                    children: [
                        {
                            value: 'Tân Quý Tây',
                            label: 'Tân Quý Tây',
                        },
                        {
                            value: 'Tân Tuc',
                            label: 'Tân Túc',
                        },
                    ],
                },
            ],
        },
        {
            value: 'Hà Nội',
            label: 'Hà Nội',
            children: [
                {
                    value: 'Bắc Từ Liêm',
                    label: 'Bắc Từ Liêm',
                    children: [
                        {
                            value: 'Nam Yết',
                            label: 'Nam Yết',
                        },
                    ],
                },
            ],
        },
    ];
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const user = {
        fistName: 'Nguyen Ngoc',
        lastName: 'Huyen',
        gender: 'female',
        email: 'ngochuyen05022000@gmail.com',
        phone: '0945254688',
        role: 'Marketing Staff',
        address: '123-Hai Ba Trung, Ha Noi,Viet Nam',
        birthDate: '01/10/2001',
        social: 'fb'
    }
    const handleOpenEdit = () => {
        setIsEdit(true)
    }
    const handleUpdate=()=>{
        setIsEdit(false)
    }
    return (
        <Col className='box-info box' xs={{ span: 24, offset: 1 }} lg={{ span: 15, offset: 1 }}>

            {
                !!isEdit ? (
                    <Form
                        className='form-edit-user'
                        {...formItemLayout}
                        form={form}
                        name="update-user"
                        onFinish={onFinish}
                        labelAlign='left'
                        size='large'

                        initialValues={{
                            residence: ['Hồ Chí Minh', 'Quận 5', 'Phường 13'],
                            prefix: '86',
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="fisrtName"
                            label="Họ và Tên lót"
                            tooltip="What do you want others to call you?"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your nickname!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            label="Tên"
                            tooltip="What do you want others to call you?"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your nickname!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Giới Tính"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select gender!',
                                },
                            ]}
                        >
                            <Select placeholder="select your gender">
                                <Option value="male">Nam</Option>
                                <Option value="female">Nữ</Option>
                                <Option value="other">OKhác</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Số Điện Thoại"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="residence"
                            label="Địa Chỉ"
                            rules={[
                                {
                                    type: 'array',
                                    required: true,
                                    message: 'Please select your habitual residence!',
                                },
                            ]}
                        >
                            <Cascader options={residences}/>
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="Số Nhà"
                            tooltip="What do you want others to call you?"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your nickname!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="website"
                            label="Website"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input website!',
                                },
                            ]}
                        >
                            <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                                <Input/>
                            </AutoComplete>
                        </Form.Item>

                        <Form.Item  name="birthDate" label="Ngày Sinh">
                            <DatePicker />
                        </Form.Item>

                        <Form.Item
                            name="role"
                            label="Chức Vụ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select gender!',
                                },
                            ]}
                        >
                            <Select placeholder="select your gender">
                                <Option value="male">CEO</Option>
                                <Option value="female">CTO</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>

                        <div className="form-group-footer">
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" onClick={handleUpdate}>
                                    Cập Nhật
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                ) : (
                    <div className="info-user">
                        {
                            !isEdit && (
                                <div className='header-box-info'>
                                    <Tooltip title="Cập Nhật Thông Tin" color='cyan' key='cyan'>
                                        <Button className='btn-edit-info' onClick={handleOpenEdit}>
                                            <FaEdit className='icon'/>
                                        </Button>
                                    </Tooltip>

                                </div>
                            )
                        }
                        <div className="tb-info-user">
                            <Row className='row-item'>
                                <Col span={8} className='title'>Họ và Tên :</Col>
                                <Col span={16} className='content'>{` ${user.fistName} ${user.lastName} `} </Col>
                            </Row>
                            <Row className='row-item'>
                                <Col span={8} className='title'>Giới Tính :</Col>
                                <Col span={16} className='content'>{user.gender} </Col>
                            </Row>
                            <Row className='row-item'>
                                <Col span={8} className='title'>Chức Vụ</Col>
                                <Col span={16} className='content'>{user.role} </Col>
                            </Row>
                            <Row className='row-item'>
                                <Col span={8} className='title'>E-mail :</Col>
                                <Col span={16} className='content c-pointer'><AutoSendMail email={user.email} /> </Col>
                            </Row>
                            <Row className='row-item'>
                                <Col span={8} className='title'>Số Điện Thoại :</Col>
                                <Col span={16} className='content c-pointer'><AutoCallPhone phoneNumber={user.phone} /> </Col>
                            </Row>
                            <Row className='row-item'>
                                <Col span={8} className='title'>Địa Chỉ</Col>
                                <Col span={16} className='content'>{user.address} </Col>
                            </Row>

                            <Row className='row-item'>
                                <Col span={8} className='title'>Ngày Sinh:</Col>
                                <Col span={16} className='content'>{user.birthDate} </Col>
                            </Row>

                        </div>
                    </div>
                )
            }


        </Col>
    );
}

export default BoxInfo;