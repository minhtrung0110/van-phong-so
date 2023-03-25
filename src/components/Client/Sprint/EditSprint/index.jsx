
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {DatePicker, Form, Input} from "antd";
import {Controller, useForm} from "react-hook-form";
import dayjs from "dayjs";
import './style.scss'

EditSprint.propTypes = {

};

function EditSprint({sprint,onClose,onSave}) {
  // console.log(dayjs(sprint.startTime, "DD/MM/YYYY HH:mm:ss"))
    const [rangeValueTime, setRangeValueTime] = useState(
        [dayjs(sprint.startTime, "DD/MM/YYYY HH:mm:ss"), dayjs(sprint.endTime, "DD/MM/YYYY HH:mm:ss")]);
    const {
        control, handleSubmit, formState: { errors, isDirty, dirtyFields },
    } = useForm({
        defaultValues:{
            name:sprint.name,
            description:sprint.description,
            duration:[dayjs(sprint.startTime, "DD/MM/YYYY HH:mm:ss"), dayjs(sprint.endTime, "DD/MM/YYYY HH:mm:ss")]
        }

    });

    const onSubmit=(data)=>{
        const newDuration=[dayjs(data.duration[0], "DD/MM/YYYY HH:mm:ss").format('DD/MM/YYYY HH:mm:ss'),dayjs(data.duration[1], "DD/MM/YYYY HH:mm:ss").format('DD/MM/YYYY HH:mm:ss')]
        onSave({...data,duration:newDuration})
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
    console.log(isDirty)
    return (
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 18,
            }}
            layout="horizontal"
            onFinish={handleSubmit(onSubmit)}
            style={{

            }}
            className='create-sprint'>
            <div className="content">
                <Controller
                    name="name"
                    control={control}
                    defaultValue=''
                    rules={{required: true}}
                    render={({field}) => (
                        <Form.Item label="Tên Sprint"
                                   hasFeedback
                                   validateStatus={errors.name ? 'error' : 'success'}
                                   help={errors.name ? 'Vui lòng nhập tên sprint ': null}
                        >

                            <Input {...field} size="middle" />
                        </Form.Item>
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{required: true}}
                    render={({field}) => (
                        <Form.Item label="Mô Tả"
                                   hasFeedback
                                   validateStatus={errors.description ? 'error' : 'success'}
                                   help={errors.description ? 'Vui lòng nhập mô tả ': null}
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
                <div className="footer-edit-sprint">
                    <button className='btn-cancel' onClick={onClose}>Hủy</button>
                    <button type='submit' className={`btn-save ${!isDirty ?'disabled':''}`}>Lưu</button>
                </div>
            </div>
        </Form>
    );
}

export default EditSprint;