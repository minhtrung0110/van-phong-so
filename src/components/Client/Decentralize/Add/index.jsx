import React, {useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {Col, Form, Input, message, Row,} from "antd";
import './style.scss'
import HeaderContent from "~/components/commoms/HeaderContent";
import GroupPermission from "~/components/Client/Decentralize/GroupPermission";
import {setIsAdd, setIsReset} from "~/redux/reducer/decentralize/decentralizeReducer";
import {useDispatch} from "react-redux";
import {createRole} from "~/api/Client/Role/roleAPI";

AddRole.propTypes = {};

function AddRole({onBack}) {
    const {control, handleSubmit, getValues, formState: {errors}} = useForm();
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const [project, setProject] = useState({

        project_create: false,
        project_update: false,
        project_delete: false,
        project_view: false,
    });
    const [sprint, setSprint] = useState({
        sprint_create: false,
        sprint_update: false,
        sprint_delete: false,
        sprint_view: false,
    });
    const [task, setTask] = useState({

        task_create: false,
        task_update: false,
        task_delete: false,
        task_view: false,
    });
    const [role, setRole] = useState({

        role_create: false,
        role_update: false,
        role_delete: false,
        role_view: false,
    });

    const [staff, setStaff] = useState({

        staff_create: false,
        staff_update: false,
        staff_delete: false,
        staff_view: false,
    });
    const [department, setDepartment] = useState({
        department_create: false,
        department_update: false,
        department_delete: false,
        department_view: false,
    });
    const [post, setPost] = useState({
        post_create: false,
        post_update: false,
        post_delete: false,
    });


    const handleSubmitPermission = async (data) => {
        const name = getValues("name");
        const arrayPermissions = {
            ...staff, ...department, ...project, ...sprint, ...task, ...role,...post
        }
        const trueFieldsArray = Object.entries(arrayPermissions)
            .filter(([key, value]) => value === true)
            .map(([key]) => key);
        const newRole = {
            title: name,
            status: true,
            permissions_title: trueFieldsArray.map(item => item.replace(/_/g, '.'))
        }
        console.log(newRole);
        const result = await createRole(newRole)
        if (result.status === 1) {
            messageApi.open({
                type: 'success',
                content: result.message,
                duration: 1.3,
            });
            setTimeout(() => {
                dispatch(setIsAdd(false))
                dispatch(setIsReset(Math.random()))
            }, 1000)
        } else {
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
                    <GroupPermission setSwitchGroupSate={setPost} hideView={true} switchGroupState={post} title={'bài viết'}/>

                </Col>
                <Col className='col-title' xs={{span: 24}} lg={{span: 10}}>
                    <GroupPermission setSwitchGroupSate={setStaff} switchGroupState={staff} title={'nhân viên'}/>
                    <GroupPermission setSwitchGroupSate={setDepartment} switchGroupState={department}
                                     title={'phòng ban'}/>
                    <GroupPermission setSwitchGroupSate={setRole} switchGroupState={role}
                                     title={'chức danh'}/>
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