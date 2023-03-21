import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {AutoComplete, Button, Cascader, Col, DatePicker, Form, Input, Modal, Radio, Row, Select, Upload} from "antd";
import {Option} from "antd/es/mentions";
import {FaCut, FaLock, FaPlus, FaTrashAlt} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {setIsEdit} from "~/redux/reducer/staff/staffReducer";
import {provinceVn} from "~/asset/data/provinces-vn"
import HeaderContent from "~/components/commoms/HeaderContent";
import AddProject from "~/components/Client/Project/Add";

EditStaff.propTypes = {};
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function EditStaff(props) {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const dispatch = useDispatch();
    const onFormLayoutChange = ({disabled}) => {

    };
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
    const residences = provinceVn;

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Select.Option value="86">+86</Select.Option>
                <Select.Option value="87">+87</Select.Option>
            </Select>
        </Form.Item>
    );
    const handleCancel = () => {
        dispatch(setIsEdit(false))
    }
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    return (
        <div className="edit-staff-container">
            <HeaderContent title='Cập Nhật Nhân Viên' />
            <Form
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout="horizontal"
                onValuesChange={onFormLayoutChange}
                style={{}}
                labelAlign={"left"}
                className='row-frame'>
                <Row className='basic-info'>
                    <Col className='col-title' xs={{ span: 24}} lg={{ span: 24}}>
                        <span className='title'>Thông Tin Cơ Bản</span>
                    </Col>
                    <Col className='col-left' xs={{ span: 24}} lg={{ span: 12}}>
                        <Form.Item
                            name="firstName "
                            label="Họ và tên đệm"
                            tooltip="Điền đầy đủ - chính xác thông tin này"


                            rules={[

                                {
                                    required: true,
                                    message: 'Vui lòng điền họ và tên đệm!',
                                },
                            ]}
                        >
                            <Input size="middle" name='firstName' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            label="Tên"
                            tooltip="Điền đầy đủ - chính xác thông tin này"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền tên !',
                                },
                            ]}
                        >
                            <Input size="middle" name='lastName' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name="birthDate" label="Ngày Sinh"
                            tooltip="Điền đầy đủ - chính xác thông tin này"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền tên !',
                                },
                            ]}>
                            <DatePicker size="middle" name='birthDate' className='ant-input-no-radius ' />
                        </Form.Item>
                        <Form.Item label="Gender" name="gender"
                                   tooltip="Điền đầy đủ - chính xác thông tin này"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Vui lòng điền tên !',
                                       },
                                   ]}
                        >
                            <Radio.Group>
                                <Radio value="male">Nam</Radio>
                                <Radio value="female">Nữ</Radio>
                                <Radio value="other">Khác</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            tooltip="Điền đầy đủ - chính xác thông tin này"

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
                            <Input size="middle" name=''/>
                        </Form.Item>


                        <Form.Item
                            name="phone"
                            label="Số Điện Thoại"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    type: 'phone',
                                    message: 'Số điện thoại không hợp lệ',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng điền số điện thoại',
                                },
                            ]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                style={{
                                    width: '100%',
                                }}
                                size="middle" name=''
                                className='ant-input-no-radius '
                            />
                        </Form.Item>

                        <Form.Item
                            name="residence"
                            label="Địa Chỉ"
                            tooltip=" "
                            className='gr-ip-e-s'
                            labelAlign='left'
                            rules={[
                                {
                                    type: 'array',
                                    required: true,
                                    message: 'Vui lòng chọn địa chỉ nhà !',
                                },
                            ]}
                        >
                            <Cascader options={residences} size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="Số Nhà"
                            tooltip=" "
                            className='gr-ip-e-s'
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền số nhà - tên đường ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>


                    </Col>
                    <Col className='col-right' xs={{ span: 24}} lg={{ span: 12}}>
                        <Form.Item label="Ảnh Đại Diện" valuePropName="fileList"
                                   tooltip=" "
                                   className='gr-ip-e-s'
                                   labelAlign='left'
                        >

                            <Upload action="/upload.do" listType="picture-card"
                                    maxCount={1}
                                    onPreview={handlePreview}

                            >
                                <div>
                                    <FaPlus/>
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Tải Lên
                                    </div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name="website"
                            label="Website"
                            tooltip=" "
                            className='gr-ip-e-s'
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input website!',
                                },
                            ]}
                        >
                            <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                                <Input size="middle" name=''/>
                            </AutoComplete>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền số nhà - tên đường ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền số nhà - tên đường ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền số nhà - tên đường ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền số nhà - tên đường ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>  <Form.Item
                        name=""
                        label="Trường Dữ Liệu"
                        tooltip=" "
                        labelAlign='left'
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền số nhà - tên đường ...!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input size="middle" name='' className='ant-input-no-radius '/>
                    </Form.Item>
                    </Col>

                </Row>
                <Row className='info-company'>
                    <Col className='col-title' xs={{ span: 24}} lg={{ span: 24}}>
                        <span className='title'>Thông Tin Đối Với Doanh Nghiệp</span>
                    </Col>
                    <Col className='col-left' xs={{ span: 24}} lg={{ span: 12}}>
                        <Form.Item
                            name="role"
                            label="Chức Vụ"
                            tooltip=" "
                            className='gr-ip-e-s'
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Chọn giới tính!',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn chức vụ" size="middle" name=''>
                                <Select.Option value="male">CEO</Select.Option>
                                <Select.Option value="female">CTO</Select.Option>
                                <Select.Option value="other">Other</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                    </Col>
                    <Col className='col-right' xs={{ span: 24}} lg={{ span: 12}}>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row className='info-advance'>
                    <Col className='col-title' xs={{ span: 24}} lg={{ span: 24}}>
                        <span className='title'>Thông Tin Khác</span>
                    </Col>
                    <Col className='col-left' xs={{ span: 24}} lg={{ span: 12}}>

                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                    </Col>
                    <Col className='col-right' xs={{ span: 24}} lg={{ span: 12}}>

                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                        <Form.Item
                            name=""
                            label="Trường Dữ Liệu"
                            tooltip=" "
                            labelAlign='left'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền ...!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input size="middle" name='' className='ant-input-no-radius '/>
                        </Form.Item>
                    </Col>
                </Row>



                <div className="footer-form">
                    <Button className='  btn-cancel' onClick={handleCancel}>Thoát</Button>
                    <Button className='  btn-submit' type='submit'>Cập Nhật</Button>
                </div>
                {/*--Modal Detail Avatar --*/}
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={()=>setPreviewOpen(false)}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={previewImage}
                    />
                </Modal>
            </Form>
        </div>

    );
}

export default EditStaff;