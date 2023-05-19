// import React, {useCallback, useEffect, useMemo, useState} from 'react';
// import PropTypes from 'prop-types';
// import './style.scss'
// import {Calendar, momentLocalizer, Views} from "react-big-calendar";
// import moment from "moment";
// import 'moment/locale/vi';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import {Modal} from "antd";
// import EditProject from "~/components/Client/Project/EditProject";
// import EventItem from "~/components/Client/Schedule/AddEvent";
// import AddEvent from "~/components/Client/Schedule/AddEvent";
// import EditEvent from "~/components/Client/Schedule/EditEvent";
// import {getListDepartments} from "~/api/Client/Department/departmentAPI";
// import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
// import {deleteCookie, getCookies} from "~/api/Client/Auth";
// import {getListEvents} from "~/api/Client/Calendar";
// import {useDispatch} from "react-redux";
// ManageSchedule.propTypes = {
//
// };
//
// function ManageSchedule(props) {
//     const [myEvents, setEvents] = useState([])
//     const [showEvent,setShowEvent] = useState({event:null,show:false})
//     const [loading, setLoading] = React.useState(false);
//     const [showAddEvent,setShowAddEvent] = useState({start:null,end:null,show:false})
//     const dispatch=useDispatch()
//     const handleCancelShowEvent = ()=>{
//         setShowEvent({...showEvent,show: false})
//     }
//     const handleCancelShowAddEvent = ()=>{
//         setShowAddEvent({...showAddEvent,show: false})
//     }
//     const events = [
//         {
//             id:'1KL578as',
//             title: 'Họp Khoa Luận Tốt Nghiệp',
//             type: 'reminder',
//             notification:'1',
//             repeat:0,
//             start: new Date(2023, 2, 18, 10, 0),
//             end: new Date(2023, 2, 20, 12, 0),
//         },
//         {
//             title: 'Họp Dự Án ',
//             id:'13232as',
//             type: 'event',
//             description: 'Làm nhanh đi',
//             file:'',
//             members: [],
//             notification:'120',
//             repeat:1,
//             start: new Date(2023, 2, 21, 10, 0),
//             end: new Date(2023, 2, 28, 12, 0),
//         },
//         {
//             title: 'Đánh Cầu Lông',
//             id:'1aas',
//             type: 'schedule',
//             notification:'3',
//             repeat:0,
//             start: new Date(2023, 2, 28, 10, 0),
//             end: new Date(2023, 2, 28, 12, 0),
//             description: 'Mô tả sự kiện B'
//         },
//         {
//             title: 'Triển khai ứng dụng đặt xe',
//             id:'1as',
//             type: 'reminder',
//             notification:'60',
//             repeat:1,
//             start: new Date(2023, 2, 1, 10, 0), // Ngày bắt đầu
//             end: new Date(2023, 2, 12, 12, 0), // Ngày kết thúc
//             rule: {
//                 freq: 'weekly',
//                 interval: 1,
//                 byweekday: [moment.weekdays().indexOf('Wednesday')],
//                 dtstart: new Date(2023, 2, 1),
//                 until: new Date(2023, 4, 1),
//             },
//         },
//         // ...
//     ];
//     const handleSetUnthorization = () => {
//         dispatch(setExpiredToken(true));
//         const token = getCookies('vps_token');
//         if (token) {
//             deleteCookie('vps_token');
//         }
//     };
//     useEffect(() => {
//         async function fetchDataEvents() {
//             const respond = await getListEvents();
//             console.log('Data respond:', respond)
//             if (respond === 401) {
//                 handleSetUnthorization();
//                 return false;
//             } else if (respond === 500) {
//                 setEvents([])
//                 return false;
//             } else {
//                 setEvents(respond.results);
//             }
//             setLoading(false);
//         }
//         fetchDataEvents();
//     }, []);
//     const localizer = momentLocalizer(moment);
//
//     const handleSelectSlot = useCallback(
//         ({ start, end }) => {
//             setShowAddEvent({start,end,show: true})
//             // const title = window.prompt('New Event Name')
//             //  if (title) {
//             //      setEvents((prev) => [...prev, { start, end, title, allDay:true }])
//             //  }
//         },
//         [setEvents]
//     )
//     console.log('listEvents',myEvents)
//     const handleSelectEvent = useCallback(
//         (event) => {
//             setShowEvent({event, show: true})
//         },
//         []
//     )
//     const { defaultDate, scrollToTime } = useMemo(
//         () => ({
//             defaultDate: new Date(2023, 4, 12),
//             scrollToTime: new Date(2023, 5, 6),
//         }),
//         []
//     )
//     const handleCreateEvent=(data) => {
//         console.log('Create event: ', data)
//     }
//     const handleUpdateEvent=(data) => {
//         console.log('Update event: ', data)
//     }
//     const handleDeleteEvent=(data) => {
//         console.log('Delete event: ', data)
//     }
//     const eventStyleGetter = (event, start, end, isSelected) => {
//         const style = {
//             backgroundColor: event.color,
//             borderRadius: '5px',
//             fontSize:'14px',
//             padding: '10px',
//             fontWeight:'600',
//             opacity: 0.8,
//             color: 'white',
//             border: '0px',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//         };
//         return {
//             style: style,
//             title: event.title,
//             event_type:event.event_type,
//             content: event.content
//             // file:event.files,
//             //  members:event.members,
//             // notification:event.notification,
//             // repeat:event.repeat,
//         };
//     };
//     return (
//         <div  className='container-schedule'>
//             <Calendar
//                 className='calendar'
//                 defaultDate={defaultDate}
//                 defaultView={Views.MONTH}
//                 events={myEvents}
//                 localizer={localizer}
//                 onSelectEvent={handleSelectEvent}
//                 onSelectSlot={handleSelectSlot}
//                 selectable
//                 scrollToTime={scrollToTime}
//                 eventPropGetter={eventStyleGetter}
//                 recurringEvents={events}
//             />
//             <Modal
//                 title="Sư Kiện"
//                 onCancel={handleCancelShowAddEvent}
//
//                 footer={null
//                 }
//                 width={650}
//                 style={{ top: 100
//                 }}
//                 bodyStyle={{height: "auto"}}
//                 destroyOnClose={true}
//                 open={showAddEvent.show}
//             >
//                 <AddEvent start={showAddEvent.start} end={showAddEvent.end} onCancel={handleCancelShowAddEvent} onSave={handleCreateEvent} />
//             </Modal>
//             <Modal
//                 title="Cập Nhật Sư Kiện"
//                 onCancel={handleCancelShowEvent}
//                 footer={null
//                 }
//                 width={650}
//                 style={{ top: 100 ,
//                 }}
//                 bodyStyle={{height: "auto"}}
//                 destroyOnClose={true}
//                 open={showEvent.show}
//             >
//                 <EditEvent event={showEvent.event} onCancel={handleCancelShowEvent} onSave={handleUpdateEvent} onDelete={handleDeleteEvent} />
//             </Modal>
//         </div>
//     );
// }
//
// export default ManageSchedule;
// /*
// import React, {useState} from 'react';
// import PropTypes from 'prop-types';
// import {useForm, Controller} from "react-hook-form";
// import {DatePicker, Form, Input, Select, Upload} from "antd";
// import './style.scss'
// import {
//     FaBell,
//     FaCalendar,
//     FaCalendarAlt, FaCaretDown,
//     FaCheck,
//     FaCheckCircle,
//     FaMoneyCheckAlt, FaPaperclip,
//     FaRecycle, FaTrash, FaTrashAlt,
//     FaUserClock
// } from "react-icons/fa";
// import dayjs from "dayjs";
// import CustomEditor from "~/components/commoms/Edittor";
// import {isEmpty} from "lodash";
// import moment from "moment";
// import ConfirmModal from "~/components/commoms/ConfirmModal";
//
// EditEvent.propTypes = {};
// const optionsLoopDuration = [
//     {
//         value: '0',
//         label: 'Không lặp lại',
//     },
//     {
//         value: '1',
//         label: 'Lặp lại',
//     },
//
// ]
// const optionsNotifyDuration = [
//     {
//         value: '0',
//         label: 'Không nhắc',
//     },
//     {
//         value: '1',
//         label: 'Nhắc trước 1 ngày ',
//     },
//     {
//         value: '2',
//         label: 'Nhắc trước 2 ngày ',
//     },
//     {
//         value: '3',
//         label: 'Nhắc trước 3 ngày ',
//     },
//     {
//         value: '30',
//         label: 'Nhắc trước 30 phút ',
//     },
//     {
//         value: '60',
//         label: 'Nhắc trước 1 giờ ',
//     },
//     {
//         value: '120',
//         label: 'Nhắc trước 2 giờ ',
//     },
//
// ]
// function EditEvent({event,onSave,onCancel,onDelete}) {
//     console.log('My event:',event);
//     const [typeEvent, setTypeEvent] = useState(event.event_type)
//     const [rangeValueTime, setRangeValueTime] = useState(
//         [dayjs(event.start_time),dayjs(event.end_time)]);
//     const [errorDescription, setErrorDescription] = useState('');
//    // console.log(optionsNotifyDuration.find(item=>item.value===event.notification))
//     const [showConfirm,setShowConfirm]=useState(false)
//     const {
//         control, handleSubmit, formState: {errors, isDirty, dirtyFields},
//     } = useForm({
//         defaultValues:{
//             ...event,
//             duration:[dayjs(event.start_time),dayjs(event.end_time)],
//            // repeat:event.repeat===1?'Lặp lại':'Không lặp lại',
//
//
//
//
//         }
//     });
//     const onSubmit = (data) => {
//         console.log('Submit: ',data)
//     }
//     console.log(event)
//     const {RangePicker} = DatePicker;
//     const rangePresets = [
//         {
//             label: 'Trong 7 ngày',
//             value: [dayjs().add(-7, 'd'), dayjs()],
//         },
//         {
//             label: 'Trong 14 ngày',
//             value: [dayjs().add(-14, 'd'), dayjs()],
//         },
//         {
//             label: 'Trong 21 ngày',
//             value: [dayjs().add(-21, 'd'), dayjs()],
//         },
//         {
//             label: 'Trong 30 ngàys',
//             value: [dayjs().add(-30, 'd'), dayjs()],
//         },
//         {
//             label: 'Trong 90 ngày',
//             value: [dayjs().add(-90, 'd'), dayjs()],
//         },
//     ];
//     const onRangeChange = (dates, dateStrings) => {
//         if (dates) {
//             console.log('From: ', dates[0], ', to: ', dates[1]);
//             console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
//         } else
//             console.log('Clear');
//         setRangeValueTime([dates[0], dates[1]])
//     }
//     const editorDescription = (value) => {
//         //  setValue('description', value);nay2y2 cho form
//         setErrorDescription('');
//     };
//     const handleDeleteEvent=() => {
//         onDelete(event.id)
//         setShowConfirm(false)
//     }
//     return (
//         <Form
//
//             layout="horizontal"
//             style={{}}
//             onFinish={handleSubmit(onSave)}
//             labelAlign={"left"}
//             className='edit-event-item'
//         >
//             <div className='header-event-item'>
//                 <span className={`type-item ${typeEvent}`}
//                       onClick={() => setTypeEvent('event')}
//                 >
//                    <FaCalendarAlt className='icon'/> {event.type===1?'Sự kiện':(event.type===2?'Cần làm':'Nhắc nhở')}</span>
//                 <FaTrashAlt  className='btn-delete ' onClick={()=>setShowConfirm(true)}/>
//             </div>
//             <Controller
//                 name="title"
//                 control={control}
//                 defaultValue=""
//                 rules={{required: true}}
//                 render={({field}) => (
//                     <Form.Item
//                         hasFeedback
//                         help={errors.title ? 'Vui lòng nhập tên dự án' : null}>
//                         <Input
//                             {...field} className='input-title-event' size="large"
//                             defaultValue=''
//                             placeholder="Thêm tiêu đề cho sự kiện này."/>
//                     </Form.Item>
//                 )}
//             />
//             <div className='duration'>
//                 <div className='label'>
//                     <span className='start'>Bắt đầu</span>
//                     <span className='end'>Kết thúc</span>
//                 </div>
//                 <Controller
//                     name="duration"
//                     control={control}
//                     defaultValue=""
//                     rules={{required: true}}
//                     render={({field}) => (
//                         <Form.Item
//
//                             hasFeedback
//                             validateStatus={errors.duration ? 'error' : 'success'}
//                             help={errors.duration ? 'Vui lòng chon thời gian' : null}>
//                             <RangePicker
//                                 {...field}
//                                 presets={rangePresets}
//                                 showTime
//                                 style={{ width: 585 }}
//                                 format="DD/MM/YYYY HH:mm:ss"
//                                 className="range-date"
//                                 defaultValue={rangeValueTime}
//                             />
//                         </Form.Item>
//                     )}
//                 />
//                 {/*<div className='config'>*/}
// {/*    <div className='repeat'>*/}
// {/*        <FaRecycle className='icon'/>*/}
// {/*        <Controller*/}
// {/*            name="repeat"*/}
// {/*            control={control}*/}
// {/*            defaultValue=""*/}
// {/*            render={({field}) => (*/}
// {/*                <Select*/}
// {/*                    {...field}*/}
// {/*                    defaultValue="Không lặp lại"*/}
// {/*                    style={{*/}
// {/*                        width: 190,*/}
// {/*                    }}*/}
// {/*                    options={optionsLoopDuration}*/}
// {/*                />*/}
// {/*            )}*/}
// {/*        />*/}
//
// {/*    </div>*/}
// {/*    <div className='notification'>*/}
// {/*        <FaBell className='icon'/>*/}
// {/*        <Controller*/}
// {/*            name="notification"*/}
// {/*            control={control}*/}
// {/*            defaultValue=""*/}
// {/*            render={({field}) => (*/}
// {/*                <Select*/}
// {/*                    {...field}*/}
// {/*                    defaultValue="Không nhắc"*/}
// {/*                    style={{*/}
// {/*                        width: 190,*/}
// {/*                    }}*/}
// {/*                    options={optionsNotifyDuration}*/}
// {/*                />*/}
// {/*            )}*/}
// {/*        />*/}
//
// {/*    </div>*/}
// {/*</div>*/}
// </div>
// {
//     typeEvent==='event'  && (
//         <div className='members'>
//             <p>Người tham gia:</p>
//         </div>
//     )
// }
//
// {
//     (typeEvent==='event' || typeEvent==='schedule') && (
//         <div className='content'>
//             <p>Nội Dung Công Việc:</p>
//             <Controller
//                 name="content"
//                 control={control}
//                 defaultValue=""
//                 rules={{required: true}}
//                 render={({field}) => (
//                     <Form.Item
//                         hasFeedback
//                         validateStatus={errors.content ? 'error' : 'success'}
//                         help={errors.content ? 'Vui lòng điền mô tả cho sự kiện' : null}>
//                         <CustomEditor
//                             {...field}
//                             id="cotent" editorDescription={editorDescription}
//                             defaultValues={event.content}/>
//                     </Form.Item>
//                 )}
//             />
//
//         </div>
//     )
// }
// {
//     typeEvent==='event'  && (
//         <div className='attach'>
//             <Controller
//                 name="file"
//                 control={control}
//                 defaultValue=""
//                 render={({field}) => (
//                     <Upload
//                         {...field}
//                         action="http://localhost:3000/"
//                         listType="picture"
//                         // defaultFileList={listFile}
//                         multiple
//                         // onChange={handleChangeUpload}
//                     >
//                         <button className='btn-upload'>
//                             <FaPaperclip className='icon'/>
//                             <span className='title'>Tải lên tệp đính kèm</span>
//                         </button>
//                     </Upload>
//                 )}
//             />
//
//
//         </div>
//     )
// }
//
// <div className='footer'>
//     <button className='btn-cancel' onClick={onCancel}>Hủy</button>
//     <button className={`btn-save ${!isDirty ?'disabled':''}`} type='submit'>Lưu</button>
// </div>
// <ConfirmModal
//     open={showConfirm}
//     title="Xác Nhận Xóa"
//     content={<div dangerouslySetInnerHTML={{__html: `Bạn Có Chắc Chắn Muốn Xóa Sự Kiện <strong>${event.title}</strong>  ? `}} />}
//     textOK="Xóa"
//     textCancel="Hủy"
//     onOK={handleDeleteEvent}
//     onCancel={(e) => setShowConfirm(false)}
// />
//
// </Form>
// );
// }
//
// export default EditEvent;
//  */