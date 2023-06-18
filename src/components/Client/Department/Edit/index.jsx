import React from 'react';
import PropTypes from 'prop-types';
import HeaderContent from "~/components/commoms/HeaderContent";
import './style.scss'
import {Controller, useForm} from "react-hook-form";
import {Form, Input, Radio, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {departmentSelector} from "~/redux/selectors/department/departmenrSelector";
import {setIsEdit, setIsReset} from "~/redux/reducer/department/departmentReducer";
import {createDepartment, editDepartment} from "~/api/Client/Department/departmentAPI";

EditDepartment.propTypes = {
    onCancel: PropTypes.func.isRequired,
};

function EditDepartment({onCancel,onBack}) {
    const department = useSelector(departmentSelector)
    const dispatch=useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const {
        control, handleSubmit, formState: { errors, isDirty, dirtyFields },
    } = useForm({
        defaultValues: {...department,status:department.status===true?1:0}
    });
    const handleUpdateDepartment = async (data) => {
        const response = await editDepartment({...data,status:data.status===1,id:department.id});
        if (response.status === 1) {
            messageApi.open({
                type: 'success',
                content: response.message,
                duration: 1.35,
            });
            setTimeout(() => dispatch(setIsEdit(false)), 800)
            dispatch(setIsReset(Math.random()))
            onBack('edit')


        } else if (response.status === 0) {
            messageApi.open({
                type: 'error',
                content: response.message,
                duration: 1.4,
            });
        }

    }
    return (
        <div className="edit-department-container">
            {contextHolder}
            <HeaderContent title={'Cập Nhật Thông tin Phòng Ban'} />
            <Form
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout="horizontal"
                encType="multipart/form-data"
                style={{}}
                onFinish={handleSubmit(handleUpdateDepartment)}
                labelAlign={"left"}
                className='frame-edit-department'>
               <div className="content">
                   <Controller
                       name="id"
                       control={control}
                       defaultValue=""
                       rules={{required: true}}
                       render={({field}) => (
                           <Form.Item label="Mã Phòng">

                               <Input disabled {...field} size="middle" className='ant-input-no-radius '/>
                           </Form.Item>
                       )}
                   />
                   <Controller
                       name="name"
                       control={control}
                       defaultValue=""
                       rules={{required: true}}
                       render={({field}) => (
                           <Form.Item
                               label="Tên Phòng"
                               hasFeedback
                               validateStatus={errors.name ? 'error' : 'success'}
                               help={errors.name ? 'Vui lòng nhập tên phòng' : null}>

                               <Input  {...field} size="middle" className='ant-input-no-radius '/>
                           </Form.Item>
                       )}
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
                   <div className="box-footer">
                       <button key="2" className='btn-cancel' onClick={onCancel}>Hủy</button>
                       <button key="3" className={`btn-confirm  ${!isDirty ?'disabled':''}`}   type='submit'>Lưu</button>
                   </div>

               </div>


            </Form>

        </div>
    );
}

export default EditDepartment;