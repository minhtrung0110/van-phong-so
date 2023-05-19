import React, {useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {Col, Form, Input, message, Row,} from "antd";
import './style.scss'
import HeaderContent from "~/components/commoms/HeaderContent";
import GroupPermission from "~/components/Client/Decentralize/GroupPermission";
import {setIsAdd} from "~/redux/reducer/decentralize/decentralizeReducer";
import {useDispatch} from "react-redux";
import {createRole} from "~/api/Client/Role/roleAPI";

AddRole.propTypes = {};

function AddRole({onBack}) {
    const {control, handleSubmit,getValues, formState: {errors}} = useForm();
    const dispatch=useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const [project, setProject] = useState({
        view_project:false,
        add_project: false,
        update_project: false,
        delete_project: false,
    });
    const [sprint, setSprint] = useState({
        view_srint:false,
        add_sprint: false,
        update_sprint: false,
        delete_sprint: false,
    });
    const [task, setTask] = useState({
        view_task:false,
        add_task: false,
        update_task: false,
        delete_task: false,
    });
    const [column, setColumn] = useState({
        view_column:false,
        add_column: false,
        update_column: false,
        delete_column: false,
    });
    const [calendar, setCalendar] = useState({
        view_calendar:false,
        add_calendar: false,
        update_calendar: false,
        delete_calendar: false,
    });
    const [staff, setStaff] = useState({
        view_staff:false,
        add_staff: false,
        update_staff: false,
        delete_staff: false,
    });
    const [department, setDepartment] = useState({
        view_department:false,
        add_department: false,
        update_department: false,
        delete_department: false,
    });


    const handleSubmitPermission = async (data) => {
        const name = getValues("name");
        const arrayPermissions = {
            ...staff, ...department,
            ...project, ...sprint, ...task, ...column,
            ...calendar
        }
        const trueFieldsArray = Object.entries(arrayPermissions)
            .filter(([key, value]) => value === true)
            .map(([key]) => key);
        const newRole = {
            title: name,
            status: true,
            permissions_title: trueFieldsArray
        }
        console.log(newRole);
        const result = await createRole(newRole)
        if(result.status===1){
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });setTimeout(()=> dispatch(setIsAdd(false)),1200)
        }
        else {
            messageApi.open({
                type: 'error',
                content: result.message,
                duration: 1.3,
            });
            //  setTimeout(()=> dispatch(setIsAdd(false)),1400)
        }



    }

    return (<div className={'container-add-role'}>
        {contextHolder}
        <HeaderContent title='Tạo nhóm quyền mới'/>
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
            className='form-create-role'>
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
                    <GroupPermission setSwitchGroupSate={setProject} switchGroupState={project} title={'dự án'}/>
                    <GroupPermission setSwitchGroupSate={setSprint} switchGroupState={sprint} title={'sprint'}/>
                    <GroupPermission setSwitchGroupSate={setTask} switchGroupState={task} title={'công việc'}/>
                    <GroupPermission setSwitchGroupSate={setColumn} switchGroupState={column}
                                     title={'trạng thái công việc'}/>

                </Col>
                <Col className='col-title' xs={{span: 24}} lg={{span: 10}}>
                    <GroupPermission setSwitchGroupSate={setStaff} switchGroupState={staff} title={'nhân viên'}/>
                    <GroupPermission setSwitchGroupSate={setDepartment} switchGroupState={department}
                                     title={'phòng ban'}/>
                    <GroupPermission setSwitchGroupSate={setCalendar} switchGroupState={calendar} title={'lịch biểu'}/>
                </Col>
            </Row>


            <div className="box-footer">
                <button key="2" className='btn-cancel' onClick={onBack}>Hủy</button>
                <button key="3" className='btn-confirm' type='submit'>Lưu</button>
            </div>

        </Form>

    </div>);
}

export default AddRole;

{/*<Row className={'list-group-permissions'}>*/
}
{/*    <Col className='col-title' xs={{span: 24}} lg={{span: 10}}>*/
}
{/*        <div className={'group-permission'}>*/
}
{/*    <span className='permission-title'>*/
}
{/*        Nhóm quyền nhân sự*/
}
{/*    </span>*/
}
{/*            <div className='list'>*/
}
{/*      <span className='permission-item'>*/
}
{/*           <Controller*/
}
{/*               name="add_staff"*/
}
{/*               control={control}*/
}
{/*               defaultValue=""*/
}
{/*               render={({field}) => (<Switch {...field}/>)}*/
}
{/*           />*/
}
{/*            <span className={'title'}>Thêm nhân sự </span>*/
}
{/*      </span>*/
}

{/*                <span className='permission-item'>*/
}
{/*           <Controller*/
}
{/*               name="update_staff"*/
}
{/*               control={control}*/
}
{/*               defaultValue=""*/
}
{/*               render={({field}) => (<Switch {...field}/>)}*/
}
{/*           />*/
}
{/*            <span className={'title'}>Cập nhật nhân sự </span>*/
}
{/*                </span>*/
}

{/*                <span className='permission-item'>*/
}
{/*                   <Controller*/
}
{/*                       name="remove_staff"*/
}
{/*                       control={control}*/
}
{/*                       defaultValue=""*/
}
{/*                       render={({field}) => (<Switch {...field}/>)}*/
}
{/*                   />*/
}
{/*                    <span className={'title'}>Xóa nhân sự </span>*/
}
{/*              </span>*/
}
{/*            </div>*/
}
{/*        </div>*/
}
{/*    </Col>*/
}
{/*    <Col className='col-title' xs={{span: 24}} lg={{span: 10}}>*/
}
{/*        <div className={'group-permission'}>*/
}
{/*    <span className='permission-title'>*/
}
{/*        Nhóm quyền phòng ban*/
}
{/*    </span>*/
}
{/*            <div className='list'>*/
}
{/*      <span className='permission-item'>*/
}
{/*           <Controller*/
}
{/*               name="add_department"*/
}
{/*               control={control}*/
}
{/*               defaultValue=""*/
}
{/*               render={({field}) => (<Switch {...field}/>)}*/
}
{/*           />*/
}
{/*            <span className={'title'}>Thêm nhân sự </span>*/
}
{/*      </span>*/
}

{/*                <span className='permission-item'>*/
}
{/*           <Controller*/
}
{/*               name="update_department"*/
}
{/*               control={control}*/
}
{/*               defaultValue=""*/
}
{/*               render={({field}) => (<Switch {...field}/>)}*/
}
{/*           />*/
}
{/*            <span className={'title'}>Cập nhật phòng ban </span>*/
}
{/*                </span>*/
}

{/*                <span className='permission-item'>*/
}
{/*                   <Controller*/
}
{/*                       name="remove_department"*/
}
{/*                       control={control}*/
}
{/*                       defaultValue=""*/
}
{/*                       render={({field}) => (<Switch {...field}/>)}*/
}
{/*                   />*/
}
{/*                    <span className={'title'}>Xóa phòng ban </span>*/
}
{/*              </span>*/
}
{/*            </div>*/
}
{/*        </div>*/
}
{/*    </Col>*/
}
{/*</Row>*/
}
{/*<Row className={'list-group-permissions'}>*/
}

{/*    <Col className='col-title' xs={{span: 24}} lg={{span: 10}}>*/
}
{/*        <div className={'group-permission'}>*/
}
{/*    <span className='permission-title'>*/
}
{/*        Nhóm quyền lịch biểu*/
}
{/*    </span>*/
}
{/*            <div className='list'>*/
}
{/*      <span className='permission-item'>*/
}
{/*           <Controller*/
}
{/*               name="add_event"*/
}
{/*               control={control}*/
}
{/*               defaultValue=""*/
}
{/*               render={({field}) => (<Switch {...field}/>)}*/
}
{/*           />*/
}
{/*            <span className={'title'}>Thêm sự kiện </span>*/
}
{/*      </span>*/
}

{/*                <span className='permission-item'>*/
}
{/*           <Controller*/
}
{/*               name="update_event"*/
}
{/*               control={control}*/
}
{/*               defaultValue=""*/
}
{/*               render={({field}) => (<Switch {...field}/>)}*/
}
{/*           />*/
}
{/*            <span className={'title'}>Cập nhật sự kiện </span>*/
}
{/*                </span>*/
}

{/*                <span className='permission-item'>*/
}
{/*                   <Controller*/
}
{/*                       name="remove_event"*/
}
{/*                       control={control}*/
}
{/*                       defaultValue=""*/
}
{/*                       render={({field}) => (<Switch {...field}/>)}*/
}
{/*                   />*/
}
{/*                    <span className={'title'}>Xóa sự kiện </span>*/
}
{/*              </span>*/
}
{/*            </div>*/
}
{/*        </div>*/
}
{/*    </Col>*/
}
{/*</Row>*/
}