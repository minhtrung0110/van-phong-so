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
    FaRecycle, FaTrash, FaTrashAlt,
    FaUserClock
} from "react-icons/fa";
import dayjs from "dayjs";
import CustomEditor from "~/components/commoms/Edittor";
import {isEmpty} from "lodash";
import moment from "moment";
import ConfirmModal from "~/components/commoms/ConfirmModal";
import GroupMember from "~/components/Client/Task/GroupMember";

EditEvent.propTypes = {};
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
function EditEvent({event,onSave,onCancel,onDelete,listStaff}) {
    console.log('Detail Event: ',event)
    const [typeEvent, setTypeEvent] = useState(event.event_type)
    const [rangeValueTime, setRangeValueTime] = useState([dayjs(event.start),dayjs(event.end)]);
    const [errorDescription, setErrorDescription] = useState('');
    const [members, setMembers] = useState(event.event_employees)
   // console.log(optionsNotifyDuration.find(item=>item.value===event.notification))
    const [showConfirm,setShowConfirm]=useState(false)
    const {
        control, handleSubmit, formState: {errors, isDirty, dirtyFields},
    } = useForm({
        defaultValues:{
            ...event,
            duration:[dayjs(event.start),dayjs(event.end)],
            repeat:event.repeat===1?'Lặp lại':'Không lặp lại',
        }
    });

    const onSubmit = (data) => {
        console.log('Submit: ',data)
        setShowConfirm(false)
        onSave(data)

    }
    console.log(event)
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
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else
            console.log('Clear');
        setRangeValueTime([dates[0], dates[1]])
    }
    const editorDescription = (value) => {
        //  setValue('description', value);nay2y2 cho form
        setErrorDescription('');
    };
    const handleDeleteEvent=() => {
        onDelete(event.id)
        setShowConfirm(false)
    }
    return (
        <Form
            layout="horizontal"
            style={{}}
            onFinish={handleSubmit(onSubmit)}
            labelAlign={"left"}
            className='edit-event-item'
        >
            <div className='header-event-item'>
                <span className={`type-item ${typeEvent===1?'event':'schedule'}`}
                      onClick={() => setTypeEvent('event')}
                >
                   <FaCalendarAlt className='icon'/> {event.event_type===1?'Sự kiện':(event.event_type===2?'Cần làm':'Nhắc nhở')}</span>
                <FaTrashAlt  className='btn-delete ' onClick={()=>setShowConfirm(true)}/>
            </div>
            <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{required: true}}
                render={({field}) => (
                    <Form.Item
                        hasFeedback
                        help={errors.title ? 'Vui lòng nhập tên dự án' : null}>
                        <Input
                            {...field} className='input-title-event' size="large"
                            defaultValue=''
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
                    defaultValue=""
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
                                defaultValue={rangeValueTime}
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
                typeEvent===1  && (
                    <div className='members'>
                        <p>Người tham gia:</p>
                        <GroupMember
                            onMembers={setMembers} type={'event'} defaultMembers={members} addMember={true} selectLimit={100}
                            listMembersForTask={listStaff}/>
                    </div>
                )
            }

            {
                (typeEvent===1 || typeEvent===2) && (
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
                                        defaultValues={event.description}/>
                                </Form.Item>
                            )}
                        />

                    </div>
                )
            }
            {/*{*/}
            {/*    typeEvent===1  && (*/}
            {/*        <div className='attach'>*/}
            {/*            <Controller*/}
            {/*                name="file"*/}
            {/*                control={control}*/}
            {/*                defaultValue=""*/}
            {/*                render={({field}) => (*/}
            {/*                    <Upload*/}
            {/*                        {...field}*/}
            {/*                        action="http://localhost:3000/"*/}
            {/*                        listType="picture"*/}
            {/*                        // defaultFileList={listFile}*/}
            {/*                        multiple*/}
            {/*                        // onChange={handleChangeUpload}*/}
            {/*                    >*/}
            {/*                        <button className='btn-upload'>*/}
            {/*                            <FaPaperclip className='icon'/>*/}
            {/*                            <span className='title'>Tải lên tệp đính kèm</span>*/}
            {/*                        </button>*/}
            {/*                    </Upload>*/}
            {/*                )}*/}
            {/*            />*/}


            {/*        </div>*/}
            {/*    )*/}
            {/*}*/}

            <div className='footer'>
                <button className='btn-cancel' onClick={onCancel}>Hủy</button>
                <button className={`btn-save ${!isDirty ?'disabled':''}`} type='submit'>Lưu</button>
            </div>
            <ConfirmModal
                open={showConfirm}
                title="Xác Nhận Xóa"
                content={<div dangerouslySetInnerHTML={{__html: `Bạn Có Chắc Chắn Muốn Xóa Sự Kiện <strong>${event.title}</strong>  ? `}} />}
                textOK="Xóa"
                textCancel="Hủy"
                onOK={handleDeleteEvent}
                onCancel={(e) => setShowConfirm(false)}
            />

        </Form>
    );
}

export default EditEvent;