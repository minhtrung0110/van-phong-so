import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {AutoComplete, Button, Cascader, DatePicker, Form, Input, Modal, Select, Upload} from "antd";
import {Option} from "antd/es/mentions";
import {FaPlus} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {provinceVn} from "~/asset/data/provinces-vn";
import {setIsAdd, setIsEdit} from "~/redux/reducer/staff/staffReducer";

AddStaff.propTypes = {

};
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
function AddStaff(props) {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const dispatch=useDispatch();
    const onFormLayoutChange = ({ disabled }) => {

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
    const residences =provinceVn;

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
    const handleCancel = ()=>{
        dispatch(setIsAdd(false))
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
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            onValuesChange={onFormLayoutChange}
            style={{

            }}
            className='edit-staff'>
            <div className='box basic-info'>
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
            <div className='box advance-info'>
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

                <Form.Item
                    name="phone"
                    label="Số Điện Thoại"
                    tooltip=" "
                    className='gr-ip-e-s'
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
                        size="large" name=''
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
                    <Cascader options={residences} size="large" name='' className='mr-2r'/>
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
                    <Input size="large" name=''/>
                </Form.Item>

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
                    <Select placeholder="Chọn chức vụ" size="large" name=''>
                        <Option value="male">CEO</Option>
                        <Option value="female">CTO</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>

            </div>
            <div className='box upload-info'>
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
                            <FaPlus />
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
                        <Input size="large" name=''/>
                    </AutoComplete>
                </Form.Item>
                <div className="footer-form">
                    <Button className=' btn-outline-danger btn-cancel' onClick={handleCancel}>Thoát</Button>
                    <Button className=' btn-outline-success btn-submit'  type='submit'>Lưu</Button>
                </div>


            </div>
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
    );
}

export default AddStaff;