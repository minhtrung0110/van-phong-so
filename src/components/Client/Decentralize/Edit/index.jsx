import React, { useState} from 'react';
import PropTypes from 'prop-types';
import {useForm, Controller} from "react-hook-form";
import {message, Col, Form, Input, Row, } from "antd";
import './style.scss'
import HeaderContent from "~/components/commoms/HeaderContent";
import GroupPermission from "~/components/Client/Decentralize/GroupPermission";
import {useDispatch, useSelector} from "react-redux";
import {decentralizeSelector} from "~/redux/selectors/decentralize/decentralizeSelector";
import { setIsEdit} from "~/redux/reducer/decentralize/decentralizeReducer";

EditRole.propTypes = {};

function EditRole({ onBack}) {
    const data=useSelector(decentralizeSelector)
    const {control, handleSubmit, setValue, register,getValues, formState: {errors}} = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch=useDispatch()
    const [project,setProject]=useState({
        add_project: false,
        update_project: false,
        delete_project: false,
    });
    const [sprint,setSprint]=useState({
        add_sprint: false,
        update_sprint: false,
        delete_sprint: false,
    });
    const [task,setTask]=useState({
        add_task: false,
        update_task: false,
        delete_task: false,
    });
    const [column,setColumn]=useState({
        add_column: false,
        update_column: false,
        delete_column: false,
    });
    const [calendar,setCalendar]=useState({
        add_calendar: false,
        update_calendar: false,
        delete_calendar: false,
    });
    const [staff,setStaff]=useState({
        add_staff: false,
        update_staff: false,
        delete_staff: false,
    });
    const [department,setDepartment]=useState({
        add_department: false,
        update_department: false,
        delete_department: false,
    });


    const handleSubmitPermission = ()=>{
        const name=getValues("name");
        const result={
            name,
            ...staff,...department,
            ...project,...sprint,...task,...column,
            ...calendar
        }
        // thanh con
        console.log('Update role:', result)
        messageApi.open({
            type: 'success',
            content: 'Cập nhật thành công',
            duration: 1.3,
        });
        setTimeout(()=> dispatch(setIsEdit(false)),1400)
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
                name="name"
                control={control}
                defaultValue=""
                rules={{required: true}}

                render={({field}) => (<Form.Item
                    label="Tên quyền"
                    hasFeedback
                    validateStatus={errors.name ? 'error' : 'success'}
                    help={errors.name ? 'Vui lòng nhập tên quyền' : null}>

                    <Input  {...field} size="middle" className='ant-input-no-radius '/>
                </Form.Item>)}
            />
            <Row className={'list-group-permissions'}>
                <Col className='col-title' xs={{span: 24}} lg={{span: 10}}>
                    <GroupPermission setSwitchGroupSate={setProject} switchGroupState={project} title={'dự án'} />
                    <GroupPermission setSwitchGroupSate={setSprint} switchGroupState={sprint} title={'sprint'} />
                    <GroupPermission setSwitchGroupSate={setTask} switchGroupState={task} title={'công việc'} />
                    <GroupPermission setSwitchGroupSate={setColumn} switchGroupState={column} title={'trạng thái công việc'} />

                </Col>
                <Col className='col-title' xs={{span: 24}} lg={{span: 10}}>
                    <GroupPermission setSwitchGroupSate={setStaff} switchGroupState={staff} title={'nhân viên'} />
                    <GroupPermission setSwitchGroupSate={setDepartment} switchGroupState={department} title={'phòng ban'} />
                    <GroupPermission setSwitchGroupSate={setCalendar} switchGroupState={calendar} title={'lịch biểu'} />
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

