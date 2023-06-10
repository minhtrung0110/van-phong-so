import React, { useState} from 'react';
import PropTypes from 'prop-types';
import {useForm, Controller} from "react-hook-form";
import {message, Col, Form, Input, Row, Radio,} from "antd";
import './style.scss'
import HeaderContent from "~/components/commoms/HeaderContent";
import GroupPermission from "~/components/Client/Decentralize/GroupPermission";
import {useDispatch, useSelector} from "react-redux";
import {decentralizeSelector} from "~/redux/selectors/decentralize/decentralizeSelector";
import { setIsEdit} from "~/redux/reducer/decentralize/decentralizeReducer";
import {createRole, editRole} from "~/api/Client/Role/roleAPI";

EditRole.propTypes = {};

function EditRole({ onBack}) {
    const data=useSelector(decentralizeSelector)
    //console.log(data)
    const {control, handleSubmit, setValue, register,getValues, formState: {errors}} = useForm({
        defaultValues: {...data,status:data.status===true?1:0}}
    );
    const [messageApi, contextHolder] = message.useMessage();
    const getCheckedRule=(key)=>{
       return  data.permission.find(item=>item.name.toLowerCase()===key.toLowerCase())
    }
    //console.log('get Sprint',getCheckedRule('sprint').permission)
    const dispatch=useDispatch()
    const [project,setProject]=useState(getCheckedRule('project').permission);
    const [sprint,setSprint]=useState(getCheckedRule('sprint').permission);
    const [task,setTask]=useState(getCheckedRule('task').permission);
 //   const [column,setColumn]=useState(getCheckedRule('column').permission);
 //   const [calendar,setCalendar]=useState(getCheckedRule('calendar').permission);
    const [staff,setStaff]=useState(getCheckedRule('staff').permission);
    const [department,setDepartment]=useState(getCheckedRule('department').permission);


    const handleSubmitPermission = async (body) => {
        const name = getValues("role_title");
        const arrayPermissions = {
            ...staff, ...department,
            ...project, ...sprint, ...task,
          //  ...calendar,...column,
        }
        const trueFieldsArray = Object.entries(arrayPermissions)
            .filter(([key, value]) => value === true)
            .map(([key]) => key);
        const updateRole = {
            id: data.id,
            title: body.role_title,
            status: body.status===1,
            permissions_title: trueFieldsArray
        }
        console.log('Update role:', updateRole)
        const result = await editRole(updateRole)
        if (result.status === 1) {
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
            setTimeout(() => dispatch(setIsEdit(false)), 1200)
        } else {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.3,
            });
            //  setTimeout(()=> dispatch(setIsAdd(false)),1400)
        }

    }

    return (<div className={'container-edit-role'}>
        {contextHolder}
        <HeaderContent title='Cập nhật nhóm quyền mới'/>
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 10,
            }}
            layout="horizontal"
            encType="multipart/form-data"
            style={{}}
            onFinish={handleSubmit(handleSubmitPermission)}
            labelAlign={"left"}
            className='form-update-role'>
            <Controller
                name="role_title"
                control={control}
                defaultValue=""
                rules={{required: true}}

                render={({field}) => (<Form.Item
                    label="Tên quyền"
                    hasFeedback
                    validateStatus={errors.role_title ? 'error' : 'success'}
                    help={errors.role_title ? 'Vui lòng nhập tên quyền' : null}>

                    <Input  {...field} size="middle" className='ant-input-no-radius '/>
                </Form.Item>)}
            />
            <Controller
                name="status"
                control={control}
                rules={{required: true}}
                render={({field}) => (
                    <Form.Item label="Trạng Thái" validateStatus={errors.status ? 'error' : 'success'}
                               hasFeedback help={errors.status ? 'Vui lòng chọn trạng thái' : null}>
                        <Radio.Group {...field}>
                            <Radio value={1}>Hoạt Động</Radio>
                            <Radio value={0}>Vô Hiệu</Radio>
                        </Radio.Group>
                    </Form.Item>
                )}
            />
            <Row className={'list-group-permissions'}>
                <Col className='col-title' xs={{span: 24}} lg={{span: 10}}>
                    <GroupPermission setSwitchGroupSate={setProject} switchGroupState={project} title={'dự án'} />
                    <GroupPermission setSwitchGroupSate={setSprint} switchGroupState={sprint} title={'sprint'} />
                    <GroupPermission setSwitchGroupSate={setTask} switchGroupState={task} title={'công việc'} />
                    {/*<GroupPermission setSwitchGroupSate={setColumn} switchGroupState={column} title={'trạng thái công việc'} />*/}

                </Col>
                <Col className='col-title' xs={{span: 24}} lg={{span: 10}}>
                    <GroupPermission setSwitchGroupSate={setStaff} switchGroupState={staff} title={'nhân viên'} />
                    <GroupPermission setSwitchGroupSate={setDepartment} switchGroupState={department} title={'phòng ban'} />
                    {/*<GroupPermission setSwitchGroupSate={setCalendar} switchGroupState={calendar} title={'lịch biểu'} />*/}
                </Col>
            </Row>


            <div className="box-footer">
                <button key="2" className='btn-cancel' onClick={onBack}>Hủy</button>
                <button key="3" className='btn-confirm' type='submit'>Lưu</button>
            </div>

        </Form>

    </div>);
}

export default EditRole;

