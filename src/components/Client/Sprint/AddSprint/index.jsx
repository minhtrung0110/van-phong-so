import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {DatePicker, Form, Input} from "antd";
import {Controller, useForm} from "react-hook-form";
import dayjs from "dayjs";
import './style.scss'
import {useSelector} from "react-redux";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";

AddSprint.propTypes = {

};

function AddSprint({onClose,onSave}) {
    const [rangeValueTime, setRangeValueTime] = useState(
        []);
    const {
        control, handleSubmit, formState: { errors, isDirty, dirtyFields },
    } = useForm({
    });
    const project =JSON.parse(localStorage.getItem('project'));
    const userLogin=useSelector(getUserSelector)
    const onSubmit=(data)=>{
       const newDuration=[dayjs(data.duration[0], "DD/MM/YYYY HH:mm:ss").format('DD/MM/YYYY HH:mm:ss'),dayjs(data.duration[1], "DD/MM/YYYY HH:mm:ss").format('DD/MM/YYYY HH:mm:ss')]
        onSave({...data,
            start_date:dayjs(data.duration[0], "DD/MM/YYYY HH:mm:ss").format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            end_date:dayjs(data.duration[1], "DD/MM/YYYY HH:mm:ss").format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            project_id:project.projectId,
            user_id:userLogin.id
        })

    }
    const {RangePicker} = DatePicker;
    const rangePresets = [
        {
            label: 'Trong 7 ngày',
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: 'Trong 14 ngày',
            value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
            label: 'Trong 21 ngày',
            value: [dayjs().add(-21, 'd'), dayjs()],
        },
        {
            label: 'Trong 30 ngàys',
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: 'Trong 90 ngày',
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];
    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
          //  console.log('From: ', dates[0], ', to: ', dates[1]);
        //    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else
         //   console.log('Clear');
        setRangeValueTime([dates[0],dates[1]])
    }

    return (
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 18,
            }}
            labelAlign={"left"}
            layout="horizontal"
            onFinish={handleSubmit(onSubmit)}
            style={{

            }}
            className='create-sprint'>
            <div className="content">
                <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    rules={{required: true}}
                    render={({field}) => (
                        <Form.Item label="Tên Sprint"
                                   hasFeedback
                                   validateStatus={errors.title ? 'error' : 'success'}
                                   help={errors.title ? 'Vui lòng nhập tên sprint ': null}
                        >

                            <Input {...field} size="middle" />
                        </Form.Item>
                    )}
                />
                <Controller
                    name="goals"
                    control={control}
                    defaultValue=""
                    rules={{required: true}}
                    render={({field}) => (
                        <Form.Item label="Mô Tả"
                                   hasFeedback
                                   validateStatus={errors.goals ? 'error' : 'success'}
                                   help={errors.goals ? 'Vui lòng nhập mô tả ': null}
                        >

                            <Input.TextArea  {...field} size="middle" />
                        </Form.Item>
                    )}
                />
                <Controller
                    name="duration"
                    control={control}
                    defaultValue=""
                    rules={{required: true}}
                    render={({field}) => (
                        <Form.Item label="Thời Hạn :"
                                   hasFeedback
                                   validateStatus={errors.duration ? 'error' : 'success'}
                                   help={errors.duration ? 'Vui lòng chọn thời hạn ': null}
                        >

                            <RangePicker
                                {...field}
                                presets={rangePresets}
                                showTime
                                format="DD/MM/YYYY HH:mm:ss"
                             //   onChange={onRangeChange}
                                className="range-date"

                            />
                        </Form.Item>
                    )}
                />

                <div className="footer-create-sprint">
                    <button className='btn-cancel' onClick={onClose}>Hủy</button>
                    <button type='submit' className='btn-save'>Lưu</button>
                </div>
            </div>
        </Form>
    );
}

export default AddSprint;