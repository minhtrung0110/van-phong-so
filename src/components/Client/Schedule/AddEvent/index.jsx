import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useForm, Controller} from "react-hook-form";
import {DatePicker, Form, Input, Select, Upload} from "antd";
import './style.scss'
import {
    FaBell,
    FaCalendar,
    FaCalendarAlt, FaCaretDown,
    FaCheck,
    FaCheckCircle,
    FaMoneyCheckAlt, FaPaperclip,
    FaRecycle,
    FaUserClock
} from "react-icons/fa";
import dayjs from "dayjs";
import CustomEditor from "~/components/commoms/Edittor";
import {isEmpty} from "lodash";
import moment from "moment";
import {useSelector} from "react-redux";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";
import GroupMember from "~/components/Client/Task/GroupMember";
import {setMembers} from "~/redux/reducer/project/projectReducer";

AddEvent.propTypes = {};
const optionsLoopDuration = [
    {
        value: '0',
        label: 'Không lặp lại',
    },
    {
        value: '1',
        label: 'Lặp lại',
    },

]
const optionsNotifyDuration = [
    {
        value: '0',
        label: 'Không nhắc',
    },
    {
        value: '1',
        label: 'Nhắc trước 1 ngày ',
    },
    {
        value: '2',
        label: 'Nhắc trước 2 ngày ',
    },
    {
        value: '3',
        label: 'Nhắc trước 3 ngày ',
    },
    {
        value: '30',
        label: 'Nhắc trước 30 phút ',
    },
    {
        value: '60',
        label: 'Nhắc trước 1 giờ ',
    },
    {
        value: '120',
        label: 'Nhắc trước 2 giờ ',
    },

]
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
function AddEvent({start,end,listStaff,onSave,onCancel}) {
    const [typeEvent, setTypeEvent] = useState('event')
    const [errorDescription, setErrorDescription] = useState('');
    const [members, setMembers] =useState([])
    const {
        control, handleSubmit, formState: {errors, isDirty, dirtyFields},
    } = useForm({ defaultValues:{
            duration:[dayjs(start),dayjs(end)]
        }});
    const userLogin=useSelector(getUserSelector)
    const onSubmit = (data) => {
        const {duration,...rest}=data
        const newEvent={
            event_type:typeEvent==='event'?1:2,
            start_time:dayjs(duration[0],"DD/MM/YYYY HH:mm:ss").format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            end_time:dayjs(duration[1],"DD/MM/YYYY HH:mm:ss").format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            created_by_id:userLogin.id,
            ...rest
        }
        onSave(newEvent)
    }
    console.log(errors)
    const {RangePicker} = DatePicker;

    const editorDescription = (value) => {
        //  setValue('description', value);nay2y2 cho form
        setErrorDescription('');
    };

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
                    className='icon'/> Cần làm</span>
                <span className={`type-item reminder ${typeEvent === 'reminder' ? 'active' : ''}`}
                      onClick={() => setTypeEvent('reminder')}
                ><FaCheckCircle
                    className='icon'/> Nhắc nhở</span>
            </div>
            <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={({field}) => (
                    <Form.Item
                        hasFeedback
                        validateStatus={errors.title ? 'error' : 'success'}
                        help={errors.title ? 'Vui lòng nhập tên sự kiện' : null}>
                        <Input
                            {...field} className='input-title-event' size="large"
                            placeholder="Thêm tiêu đề cho sự kiện này."/>
                    </Form.Item>
                )}
            />
            <div className='duration'>
                <div className='label'>
                    <span className='start'>Bắt đầu</span>
                    <span className='end'>Kết thúc</span>
                </div>
                <Controller
                    name="duration"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                        <Form.Item
                            hasFeedback
                            validateStatus={errors.duration ? 'error' : 'success'}
                            help={errors.duration ? 'Vui lòng chon thời gian' : null}>
                            <RangePicker
                                {...field}
                                presets={rangePresets}
                                showTime
                                style={{ width: 585 }}
                                format="DD/MM/YYYY HH:mm:ss"
                                className="range-date"
                              //  defaultValue={[dayjs(start),dayjs(end)]}
                            />
                        </Form.Item>
                    )}
                />
                {/*<div className='config'>*/}
                {/*    <div className='repeat'>*/}
                {/*        <FaRecycle className='icon'/>*/}
                {/*        <Controller*/}
                {/*            name="repeat"*/}
                {/*            control={control}*/}
                {/*            defaultValue=""*/}
                {/*            render={({field}) => (*/}
                {/*                <Select*/}
                {/*                    {...field}*/}
                {/*                    defaultValue="Không lặp lại"*/}
                {/*                    style={{*/}
                {/*                        width: 190,*/}
                {/*                    }}*/}
                {/*                    options={optionsLoopDuration}*/}
                {/*                />*/}
                {/*            )}*/}
                {/*        />*/}

                {/*    </div>*/}
                {/*    <div className='notification'>*/}
                {/*        <FaBell className='icon'/>*/}
                {/*        <Controller*/}
                {/*            name="notification"*/}
                {/*            control={control}*/}
                {/*            defaultValue=""*/}
                {/*            render={({field}) => (*/}
                {/*                <Select*/}
                {/*                    {...field}*/}
                {/*                    defaultValue="Không nhắc"*/}
                {/*                    style={{*/}
                {/*                        width: 190,*/}
                {/*                    }}*/}
                {/*                    options={optionsNotifyDuration}*/}
                {/*                />*/}
                {/*            )}*/}
                {/*        />*/}

                {/*    </div>*/}
                {/*</div>*/}
            </div>
            {
                typeEvent==='event'  && (
                    <div className='members'>
                        <p>Người tham gia:</p>
                        <GroupMember
                            onMembers={setMembers} defaultMembers={members} addMember={true}
                            listMembersForTask={listStaff}/>
                    </div>
                )
            }

            {
                (typeEvent==='event' || typeEvent==='schedule') && (
                    <div className='description'>
                        <p>Nội Dung Công Việc:</p>
                        <Controller
                            name="content"
                            control={control}
                            defaultValue=""
                            rules={{required: true}}
                            render={({field}) => (
                                <Form.Item
                                    hasFeedback
                                    validateStatus={errors.content ? 'error' : 'success'}
                                    help={errors.content ? 'Vui lòng điền mô tả cho sự kiện' : null}>
                                <CustomEditor
                                    {...field}
                                    id="description" editorDescription={editorDescription}
                                              />
                                </Form.Item>
                            )}
                        />

                    </div>
                )
            }
            {
                typeEvent==='event'  && (
                    <div className='attach'>
                        <Controller
                            name="file"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                    <Upload
                                        {...field}
                                        action="http://localhost:3000/"
                                        listType="picture"
                                        // defaultFileList={listFile}
                                        multiple
                                        // onChange={handleChangeUpload}
                                    >
                                        <button className='btn-upload'>
                                            <FaPaperclip className='icon'/>
                                            <span className='title'>Tải lên tệp đính kèm</span>
                                        </button>
                                    </Upload>
                            )}
                        />


                    </div>
                )
            }

            <div className='footer'>
                        <button className='btn-cancel' onClick={onCancel}>Hủy</button>
                <button className={`btn-save ${!isDirty ?'disabled':''}`} type='submit'>Lưu</button>
            </div>

        </Form>
    );
}

export default AddEvent;