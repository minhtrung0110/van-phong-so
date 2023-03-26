import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useForm, Controller} from "react-hook-form";
import {Form, Input} from "antd";
import './style.scss'
import {FaCalendar, FaCalendarAlt, FaCheck, FaCheckCircle, FaMoneyCheckAlt, FaUserClock} from "react-icons/fa";

EventItem.propTypes = {};

function EventItem({event}) {
    const [typeEvent, setTypeEvent] = useState('event')
    const {
        control, handleSubmit, formState: {errors, isDirty, dirtyFields},
    } = useForm({});
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <Form

            layout="horizontal"
            style={{}}
            onFinish={handleSubmit(onSubmit)}
            labelAlign={"left"}
            className='event-item'
        >
            <div className='type-event-item'>
                <span className={`type-item event ${typeEvent === 'event' ? 'active' : ''}`}
                      onClick={() => setTypeEvent('event')}
                >
                   <FaCalendarAlt className='icon'/> Sự kiện</span>
                <span className={`type-item schedule ${typeEvent === 'schedule' ? 'active' : ''}`}
                      onClick={() => setTypeEvent('schedule')}
                >
                <FaUserClock
                    className='icon'/> Lịch trình</span>
                <span className={`type-item todo ${typeEvent === 'todo' ? 'active' : ''}`}
                      onClick={() => setTypeEvent('todo')}
                ><FaCheckCircle
                    className='icon'/> Cần làm</span>
            </div>
            <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={({field}) => (
                    <Form.Item

                        hasFeedback
                        help={errors.name ? 'Vui lòng nhập tên dự án' : null}>
                        <Input
                            {...field} className='input-title-event' size="large"
                            placeholder="Thêm tiêu đề cho sự kiện này."/>
                    </Form.Item>
                )}
            />
        </Form>
    );
}

export default EventItem;