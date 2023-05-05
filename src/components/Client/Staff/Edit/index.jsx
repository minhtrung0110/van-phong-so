import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import dayjs from 'dayjs';
import 'dayjs/locale/vi'
import vi_VN from "antd/lib/locale/vi_VN";
import {
    AutoComplete, message, Cascader, Col, DatePicker, Form, Input, Modal, Radio, Row, Select, Upload, ConfigProvider
} from "antd";
import {FaPlus, FaUserPlus,} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {setIsEdit} from "~/redux/reducer/staff/staffReducer";
import {provinceVn} from "~/asset/data/provinces-vn"
import HeaderContent from "~/components/commoms/HeaderContent";
import {useForm, Controller} from "react-hook-form";
import {listCounties} from "~/asset/data/initDataGlobal";
import {createStaff, editStaff} from "~/api/Client/Staff/staffAPI";
import {staffSelector} from "~/redux/selectors/staff/staffSelector";


EditStaff.propTypes = {};
const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

function EditStaff(props) {

    dayjs.locale('vi'); // thiết lập ngôn ngữ hiển thị là tiếng Việt

    let data = useSelector(staffSelector)
    console.log(data);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const dispatch = useDispatch();
    // xủ lý data
    let {job_info, contact_info, role, ...rest} = data
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const {
        control, handleSubmit, formState: {errors, isDirty, dirtyFields},
    } = useForm({
        defaultValues: {
            ...job_info, ...contact_info, ...rest,
            birthday:dayjs(dayjs(data.birthday ).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD'),
            date_of_degree:dayjs(dayjs(data.date_of_degree ).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD'),
            date_of_joining:dayjs(dayjs(data.job_info.date_of_degree ).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD')
        }
    });
    console.log( {
            ...job_info, ...contact_info, ...rest,
            birthday:dayjs(dayjs(data.birthday ).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD'),
            date_of_degree:dayjs(dayjs(data.date_of_degree ).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD'),
            date_of_joining:dayjs(dayjs(data.job_info.date_of_degree ).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD')
    })
    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };
    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website, value: website,
    }));
    const residences = provinceVn;

    const prefixSelector = (<Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Select.Option value="86">+86</Select.Option>
                <Select.Option value="87">+87</Select.Option>
            </Select>
        </Form.Item>);

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
    const onSave = async (data) => {
        const updateStaff = {
            ...data,
            contact_info: {
                bank_account_number: data.bank_account_number,
                bank_name: data.bank_name,
                emergency_contact: data.emergency_contact,
                permanent_address: data.permanent_address,
                tax_code: data.tax_code,
                temporary_address: data.temporary_address
            },
            job_info: {
                company_id: 1,
                date_of_joining:dayjs(data.date_of_joining, "DD/MM/YYYY HH:mm:ss").format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                department_id: data.department_id,
                group_id: data.group_id,
                job_title: data.job_title
            },
            birthday:dayjs(data.birthday, "DD/MM/YYYY HH:mm:ss").format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            date_of_degree:dayjs(data.date_of_degree, "DD/MM/YYYY HH:mm:ss").format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            education_level:+data.education_level,
            permanent_address: `${data.per_address} ${data.per_residence}`,
            temporary_address: `${data.tmp_address} ${data.tmp_residence}`,
            avatar_url: `https://th.bing.com/th/id/R.8a11509003ea4fc583e224…7ebde5?rik=KSGxl77IPIC1Iw&riu=http%3a%2f%2fupload`,
        }
        delete updateStaff.tmp_address
        delete updateStaff.per_address
        delete updateStaff.tmp_residence
        delete updateStaff.per_residence
        delete updateStaff.social_network
        console.log('Update Staff:', updateStaff)

        const respond = await editStaff(updateStaff)
        console.log(respond)
        if(respond.status===1){
            messageApi.open({
                type: 'success',
                content: respond.message,
                duration: 1.3,
            });
            props.backToStaffList([
                {
                    key: 'updated_at',
                    value: 'desc',
                },
            ]);
            setTimeout(() => handleCancel(), 1300)
        }
        else {
            messageApi.open({
                type: 'error',
                content: respond.message,
                duration: 1.3,
            });
        }

        // thành công


    }
    return (<div className="create-staff-container">
            {contextHolder}
            <HeaderContent title='Thêm Nhân Viên' icon={FaUserPlus}/>
            <Form
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout="horizontal"
                onFinish={handleSubmit(onSave)}

                labelAlign={"left"}
                className='row-frame'>
                <Row className='basic-info'>
                    <Col className='col-title' xs={{span: 24}} lg={{span: 24}}>
                        <span className='title'>Thông Tin Cơ Bản</span>
                    </Col>
                    <Col className='col-left' xs={{span: 24}} lg={{span: 12}}>

                        <Controller
                            control={control}
                            name="first_name"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Họ"
                                    hasFeedback
                                    validateStatus={errors.first_name ? 'error' : 'success'}
                                    help={errors.first_name ? 'Vui lòng nhập họ' : null}>

                                    <Input  {...field} size="middle" className='ant-input-no-radius '/>
                                </Form.Item>)}
                        />

                        <Controller
                            control={control}
                            name="last_name"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Tên"
                                    hasFeedback
                                    validateStatus={errors.last_name ? 'error' : 'success'}
                                    help={errors.last_name ? 'Vui lòng nhập tên ' : null}>

                                    <Input  {...field} size="middle"/>
                                </Form.Item>)}
                        />

                        <Form.Item
                            label="Ngày sinh"
                            hasFeedback
                            name='birthday'
                            validateStatus={errors.birthday ? 'error' : 'success'}
                            help={errors.birthday ? 'Vui lòng nhập ngày sinh ' : null}>
                            <Controller
                                control={control}
                                name='birthday'
                                rules={{required: true}}
                                render={({field}) => (
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            size="middle" placeholder={'Chọn ngày'}
                                       //    defaultValue={dayjs(dayjs(data.birthday ).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD')}
                                            {...field}
                                        />
                                    )}
                            />
                        </Form.Item>

                        <Controller
                            control={control}
                            name='sex'
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Giới tính" name="sex"
                                    hasFeedback
                                    validateStatus={errors.sex ? 'error' : 'success'}
                                    help={errors.sex ? 'Vui lòng chọn giới tính' : null}>

                                    <Radio.Group {...field}>
                                        <Radio value='male'>Nam</Radio>
                                        <Radio value='female'>Nữ</Radio>
                                    </Radio.Group> </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name='place_of_birth'
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Nơi sinh"
                                    hasFeedback
                                    validateStatus={errors.place_of_birth ? 'error' : 'success'}
                                    help={errors.place_of_birth ? 'Vui lòng nhập nơi sinh ' : null}>

                                    <Input {...field} size="middle"/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name='email'
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Mail"
                                    hasFeedback
                                    validateStatus={errors.email ? 'error' : 'success'}
                                    help={errors.email ? 'Vui lòng nhập mail ' : null}>

                                    <Input {...field} size="middle"/>
                                </Form.Item>)}
                        />

                        <Controller
                            control={control}
                            name='personal_email'
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="E-mail cá nhân"
                                    hasFeedback
                                    validateStatus={errors.personal_email ? 'error' : 'success'}
                                    help={errors.personal_email ? 'Vui lòng nhập mail cá nhân ' : null}>
                                    <Input {...field} size="middle"/>
                                </Form.Item>)}
                        />

                        <Controller
                            control={control}
                            name='phone_number'
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Số điện thoại"
                                    hasFeedback
                                    labelAlign='left'
                                    validateStatus={errors.phone_number ? 'error' : 'success'}
                                    help={errors.phone_number ? 'Vui lòng nhập số điện thoại ' : null}>
                                    <Input
                                        {...field}
                                        addonBefore={prefixSelector}
                                        style={{
                                            width: '100%',
                                        }}
                                        size="middle" name=''
                                        className='ant-input-no-radius '
                                    />
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="marital_status"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Tình trạng hôn nhân "
                                    hasFeedback
                                    validateStatus={errors.marital_status ? 'error' : 'success'}
                                    help={errors.marital_status ? 'Vui lòng chọn ' : null}>
                                    <Select {...field}
                                            options={[{value: 'single', label: 'Độc thân'}, {
                                                value: 'Married',
                                                label: 'Đã kết hôn'
                                            }, {value: 'Divorced', label: 'Đã ly hôn'}, {
                                                value: 'Widowed',
                                                label: 'Góa vợ hoặc góa chồng'
                                            }]}
                                    />

                                </Form.Item>)}
                        />

                        <Controller
                            control={control}
                            name="ethnicity"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Dân tộc "
                                    hasFeedback
                                    validateStatus={errors.ethnicity ? 'error' : 'success'}
                                    help={errors.ethnicity ? 'Vui lòng điền dân tộc ' : null}>
                                    <Input {...field} size="middle"/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="avatar_url"
                            render={({field}) => (<Form.Item
                                    label="Ảnh Đại Diện">
                                    <Upload
                                        {...field}
                                        action="/upload.do" listType="picture-card"
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
                                </Form.Item>)}
                        />

                    </Col>

                    <Col className='col-right' xs={{span: 24}} lg={{span: 12}}>
                        <Controller
                            control={control}
                            name="nationality"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Quốc tịch"
                                    hasFeedback
                                    validateStatus={errors.nationality ? 'error' : 'success'}
                                    help={errors.nationality ? 'Vui lòng nhập quốc tịch ' : null}>
                                    <Select {...field}
                                            options={listCounties}/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="religion"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Tôn giáo"
                                    hasFeedback
                                    validateStatus={errors.religion ? 'error' : 'success'}
                                    help={errors.religion ? 'Vui lòng nhập tôn giáo ' : null}>
                                    <Input {...field}/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="id_number"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Căn cước công dân"
                                    hasFeedback
                                    validateStatus={errors.id_number ? 'error' : 'success'}
                                    help={errors.id_number ? 'Vui lòng nhập căn cước công dân ' : null}>
                                    <Input {...field}/>
                                </Form.Item>)}
                        />

                        <Controller
                            control={control}
                            name="place_of_issue"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Nơi cấp"
                                    hasFeedback
                                    validateStatus={errors.place_of_issue ? 'error' : 'success'}
                                    help={errors.place_of_issue ? 'Vui lòng nhập nơi cấp ' : null}>
                                    <Input {...field}/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="education_level"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Trình độ"
                                    hasFeedback
                                    validateStatus={errors.education_level ? 'error' : 'success'}
                                    help={errors.education_level ? 'Vui lòng điền trình độ ' : null}>
                                    <Input {...field}/>
                                </Form.Item>)}
                        />

                        <Controller
                            control={control}
                            name="major"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Chuyên ngành"
                                    hasFeedback
                                    validateStatus={errors.major ? 'error' : 'success'}
                                    help={errors.major ? 'Vui lòng điền chuyên ngành ' : null}>
                                    <Input {...field}/>
                                </Form.Item>)}
                        />

                        <Controller
                            control={control}
                            name="education_degree"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Bằng cấp "
                                    hasFeedback
                                    validateStatus={errors.education_degree ? 'error' : 'success'}
                                    help={errors.education_degree ? 'Vui lòng điền bằng cấp ' : null}>
                                    <Input {...field}/>
                                </Form.Item>)}
                        />

                        <Controller
                            control={control}
                            name="graduated_school"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Tốt nghiệp trường "
                                    hasFeedback
                                    validateStatus={errors.graduated_school ? 'error' : 'success'}
                                    help={errors.graduated_school ? 'Vui lòng điền trường ' : null}>
                                    <Input {...field}/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="date_of_degree"
                            rules={{required: true}}
                            render={({field}) => (
                                <Form.Item
                                    label="Thời gian tốt nghiệp"
                                    hasFeedback
                                    validateStatus={errors.date_of_degree ? 'error' : 'success'}
                                    help={errors.date_of_degree ? 'Vui lòng chọn thời gian tốt nghiệp ' : null}>
                                    <DatePicker {...field}
                                                placeholder="Chọn thời gian"
                                                format={'DD/MM/YYYY'} picker="month"
                                             //   defaultValue={dayjs(dayjs(data.date_of_degree ).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD')}
                                    />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            control={control}
                            name="social_network"
                            render={({field}) => (<Form.Item
                                    label="Mạng xã hội"
                                    hasFeedback>
                                    <AutoComplete {...field} options={websiteOptions} onChange={onWebsiteChange}
                                                  placeholder="fb,linked,ig,..">
                                        <Input size="middle" name=''/>
                                    </AutoComplete>
                                </Form.Item>)}
                        />

                    </Col>

                </Row>
                <Row className='info-company'>
                    <Col className='col-title' xs={{span: 24}} lg={{span: 24}}>
                        <span className='title'>Thông Tin Đối Với Doanh Nghiệp</span>
                    </Col>
                    <Col className='col-left' xs={{span: 24}} lg={{span: 12}}>
                        <Controller
                            control={control}
                            name="role_id"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Chức Vụ"
                                    hasFeedback
                                    validateStatus={errors.role ? 'error' : 'success'}
                                    help={errors.role ? 'Vui lòng chọn chức vụ ' : null}>
                                    <Select {...field} placeholder="Chọn chức vụ" size="middle">
                                        <Select.Option value={1}>CEO</Select.Option>
                                        <Select.Option value={2}>CTO</Select.Option>
                                        <Select.Option value={3}>Other</Select.Option>
                                    </Select>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="job_title"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item

                                    label="Tên công việc"
                                    hasFeedback
                                    validateStatus={errors.job_title ? 'error' : 'success'}
                                    help={errors.job_title ? 'Vui lòng chọn công việc ' : null}>
                                    <Input {...field} size="middle"/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="date_of_joining"
                            rules={{required: true}}
                            render={({field}) => (
                                <Form.Item
                                    label="Ngày vào làm"
                                    hasFeedback
                                    validateStatus={errors.date_of_joining ? 'error' : 'success'}
                                    help={errors.date_of_joining ? 'Vui lòng điền ngày vào làm ' : null}>
                                    <DatePicker {...field}
                                             //   defaultValue={dayjs(dayjs(data.job_info.date_of_joining ).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD')}
                                                size="middle" format="DD/MM/YYYY"/>
                                </Form.Item>
                            )}
                        />

                    </Col>
                    <Col className='col-right' xs={{span: 24}} lg={{span: 12}}>
                        <Controller
                            control={control}
                            name="department_id"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item

                                    label="Phòng ban"
                                    hasFeedback
                                    validateStatus={errors.department_id ? 'error' : 'success'}
                                    help={errors.department_id ? 'Vui lòng chọn phòng ban ' : null}>
                                    <Select {...field} options={[{key: '1', value: 1}]}/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="group_id"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item

                                    label="Nhóm làm việc"
                                    hasFeedback
                                    validateStatus={errors.group_id ? 'error' : 'success'}
                                    help={errors.group_id ? 'Vui lòng chọn nhóm ' : null}>
                                    <Select {...field} options={[{key: '1', value: 1}]} size="middle"/>
                                </Form.Item>)}
                        />

                    </Col>
                </Row>
                <Row className='info-advance'>
                    <Col className='col-title' xs={{span: 24}} lg={{span: 24}}>
                        <span className='title'>Thông Tin Liên Hệ</span>
                    </Col>
                    <Col className='col-left' xs={{span: 24}} lg={{span: 12}}>
                        <Controller
                            control={control}
                            name="per_residence"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Địa chỉ thường trú"
                                    hasFeedback
                                    validateStatus={errors.per_residence ? 'error' : 'success'}
                                    help={errors.per_residence ? 'Vui lòng điền địa chỉ thừơng trú ' : null}>
                                    <Cascader options={residences} {...field} size="middle" name=''
                                              className='ant-input-no-radius '/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="per_address"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Số nhà thường trú"
                                    hasFeedback
                                    validateStatus={errors.per_address ? 'error' : 'success'}
                                    help={errors.per_address ? 'Vui lòng điền số nhà thường trú ' : null}>
                                    <Input {...field} size="middle"/>
                                </Form.Item>)}
                        />

                        <Controller
                            control={control}
                            name="tmp_residence"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Địa chỉ thường trú"
                                    hasFeedback
                                    validateStatus={errors.tmp_residence ? 'error' : 'success'}
                                    help={errors.tmp_residence ? 'Vui lòng điền địa chỉ tạm trú ' : null}>
                                    <Cascader options={residences} {...field} size="middle" name=''
                                              className='ant-input-no-radius '/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="tmp_address"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item

                                    label="Số nhà tạm trú "
                                    hasFeedback
                                    validateStatus={errors.tmp_address ? 'error' : 'success'}
                                    help={errors.tmp_address ? 'Vui lòng điền số nhà tạm trú ' : null}>
                                    <Input {...field} size="middle"/>
                                </Form.Item>)}
                        />
                    </Col>
                    <Col className='col-right' xs={{span: 24}} lg={{span: 12}}>
                        <Controller
                            control={control}
                            name="emergency_contact"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Liên hệ khẩn cấp"
                                    hasFeedback
                                    validateStatus={errors.emergency_contact ? 'error' : 'success'}
                                    help={errors.emergency_contact ? 'Vui lòng điền số điện thoại ' : null}>
                                    <Input {...field} size="middle"/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="tax_code"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item
                                    label="Mã số thuế"
                                    hasFeedback
                                    validateStatus={errors.tax_code ? 'error' : 'success'}
                                    help={errors.tax_code ? 'Vui lòng điền ma số thuế ' : null}>
                                    <Input {...field} size="middle"/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="bank_name"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item

                                    label="Ngân hàng"
                                    hasFeedback
                                    validateStatus={errors.bank_name ? 'error' : 'success'}
                                    help={errors.bank_name ? 'Vui lòng chọn ngân hàng ' : null}>
                                    <Select {...field}
                                            options={[{
                                                key: 'VCB', value: 'Ngân hàng TMCP Ngoại Thương Việt Nam'
                                            }, {key: 'CTG', value: 'Ngân hàng TMCP Công Thương Việt Nam'}, {
                                                key: 'BIDV', value: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam'
                                            }, {key: 'ACB', value: 'Ngân hàng TMCP Á Châu'}, {
                                                key: 'MB', value: 'Ngân hàng TMCP Quân Đội'
                                            }, {key: 'TCB', value: 'Ngân hàng TMCP Kỹ Thương Việt Nam'}, {
                                                key: 'VPB', value: 'Ngân hàng TMCP Việt Nam Thịnh Vượng'
                                            }, {
                                                key: 'Techcombank', value: 'Ngân hàng TMCP Kỹ Thương Việt Nam'
                                            }, {key: 'SHB', value: 'Ngân hàng TMCP Sài Gòn - Hà Nội'}, {
                                                key: 'HDBank', value: 'Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh'
                                            }, {
                                                key: 'AGRIBANK',
                                                value: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam'
                                            }, {
                                                key: 'Vietcombank', value: 'Ngân hàng TMCP Ngoại Thương Việt Nam'
                                            }, {key: 'OceanBank', value: 'Ngân hàng TMCP Đại Dương'}, {
                                                key: 'PVcomBank', value: 'Ngân hàng TMCP Đại Chúng Việt Nam'
                                            }, {key: 'SCB', value: 'Ngân hàng TMCP Sài Gòn'}, {
                                                key: 'SeABank', value: 'Ngân hàng TMCP Đông Nam Á'
                                            }, {key: 'VIB', value: 'Ngân hàng TMCP Quốc tế'}, {
                                                key: 'VietinBank', value: 'Ngân hàng TMCP Công Thương Việt Nam'
                                            }]}
                                            size="middle"/>
                                </Form.Item>)}
                        />
                        <Controller
                            control={control}
                            name="bank_account_number"
                            rules={{required: true}}
                            render={({field}) => (<Form.Item

                                    label="Số tài khoản"
                                    hasFeedback
                                    validateStatus={errors.bank_account_number ? 'error' : 'success'}
                                    help={errors.bank_account_number ? 'Vui lòng điền số tài khoản ' : null}>
                                    <Input {...field} size="middle"/>
                                </Form.Item>)}
                        />
                    </Col>
                </Row>

                <div className="footer-form">
                    <button className='btn-cancel' onClick={handleCancel}>Thoát</button>
                    <button className={`btn-submit  ${!isDirty ?'disabled':''}`} type='submit'>Cập Nhật</button>

                </div>
                {/*--Modal Detail Avatar --*/}
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
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