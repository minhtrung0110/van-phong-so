import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from "moment";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import {message, Modal} from "antd";
import EditProject from "~/components/Client/Project/EditProject";
import EventItem from "~/components/Client/Schedule/AddEvent";
import AddEvent from "~/components/Client/Schedule/AddEvent";
import EditEvent from "~/components/Client/Schedule/EditEvent";
import {getListDepartments} from "~/api/Client/Department/departmentAPI";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import {createEvent, getListEvents} from "~/api/Client/Calendar";
import {useDispatch} from "react-redux";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {config} from "~/config";
import {getListStaffs} from "~/api/Client/Staff/staffAPI";
ManageSchedule.propTypes = {

};

function ManageSchedule(props) {
    const [myEvents, setEvents] = useState([])
    const [showEvent,setShowEvent] = useState({event:null,show:false})
    const [loading, setLoading] = React.useState(false);
    const [showAddEvent,setShowAddEvent] = useState({start:null,end:null,show:false})
    const [listStaff,setListStaff] = useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleCancelShowEvent = ()=>{
        setShowEvent({...showEvent,show: false})
    }
    const handleCancelShowAddEvent = ()=>{
        setShowAddEvent({...showAddEvent,show: false})
    }
    const events = [
        {
            id:'1KL578as',
            title: 'Họp Khoa Luận Tốt Nghiệp',
            type: 'reminder',
            notification:'1',
            repeat:0,
            start: new Date(2023, 5, 18, 10, 0),
            end: new Date(2023, 5, 20, 12, 0),
        },
        {
            title: 'Họp Dự Án ',
            id:'13232as',
            type: 'event',
            description: 'Làm nhanh đi',
            file:'',
            members: [],
            notification:'120',
            repeat:1,
            start: new Date(2023, 5, 21, 10, 0),
            end: new Date(2023, 5, 28, 12, 0),
        },
        {
            title: 'Đánh Cầu Lông',
            id:'1aas',
            type: 'schedule',
            notification:'3',
            repeat:0,
            start: new Date(2023, 5, 28, 10, 0),
            end: new Date(2023, 5, 28, 12, 0),
            description: 'Mô tả sự kiện B'
        },
        {
            title: 'Triển khai ứng dụng đặt xe',
            id:'1as',
            type: 'reminder',
            notification:'60',
            repeat:1,
            start: new Date(2023, 4, 26, 10, 0), // Ngày bắt đầu
            end: new Date(2023, 1, 30, 12, 0), // Ngày kết thúc
            rule: {
                freq: 'weekly',
                interval: 1,
                byweekday: [moment.weekdays().indexOf('Wednesday')],
                dtstart: new Date(2023, 2, 1),
                until: new Date(2023, 4, 1),
            },
        },
        // ...
    ];
    const handleSetUnthorization = () => {
        dispatch(setExpiredToken(true));
        const token = getCookies('vps_token');
        if (token) {
            deleteCookie('vps_token');
        }
        navigate(config.routes.login)
    };
    useEffect(() => {
        async function fetchDataEvents() {
            const respond = await getListEvents();
            console.log('Data respond:', respond)
            if (respond === 401) {
                handleSetUnthorization();
                return false;
            } else if (respond === 500) {
                setEvents([])
                return false;
            } else {
                setData(respond.results);
            }
            setLoading(false);
        }
        fetchDataEvents();
        async function fetchDataStaff() {
            const respond = await getListStaffs();
            console.log('Data respond:', respond)
            if (respond === 401) {
                handleSetUnthorization();
                return false;
            } else if (respond === 500) {
                setListStaff([])
                return false;
            } else {
                setListStaff(respond.results);
            }
            setLoading(false);
        }
        fetchDataStaff();
    }, []);
    const localizer = momentLocalizer(moment);
    const setData=(array)=>{
      const events=  array.map((event)=>({id: event.id,start:new Date(event.start_time),end:new Date(event.end_time),title:event.title,...event}))
        setEvents(events)
    }
    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            setShowAddEvent({start,end,show: true})
           // const title = window.prompt('New Event Name')
           //  if (title) {
           //      setEvents((prev) => [...prev, { start, end, title, allDay:true }])
           //  }
        },
        [setEvents]
    )

    const handleSelectEvent = useCallback(
        (event) => {

            setShowEvent({event, show: true})
        },
        []
    )
    const { defaultDate, scrollToTime } = useMemo(
        () => ({
            defaultDate: new Date(2023, 5, 1),
            scrollToTime: new Date(2023, 5, 30, 6),
        }),
        []
    )
    const handleCreateEvent=async (data) => {
        console.log('Create event: ', data)
        const result = await createEvent(data)
        if (result.status===1) {
            messageApi.open({
                type:'success',
                message:result.message,
                duration:1.3
            })
        }
        else if(result.status===401){
            handleSetUnthorization();
        }
        else {
            messageApi.open({
                type:'error',
                message:result.message,
                duration:1.3
            })
        }

    }
    const handleUpdateEvent=(data) => {
        console.log('Update event: ', data)
    }
    const handleDeleteEvent=(data) => {
        console.log('Delete event: ', data)
    }
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: event.color,
            borderRadius: '5px',
            fontSize:'14px',
            padding: '10px',
            fontWeight:'600',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };
        return {
            style: style,
            title: event.title,
            type:event.type,
            description: event.description,
            file:event.files,
            members:event.members,
            notification:event.notification,
            repeat:event.repeat,
        };
    };
    console.log(myEvents)
    return (
        <div  className='container-schedule'>
            <Calendar
                className='calendar'
                defaultDate={defaultDate}
                defaultView={Views.MONTH}
                events={myEvents}
                localizer={localizer}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                scrollToTime={scrollToTime}
                eventPropGetter={eventStyleGetter}
                recurringEvents={events}
            />
            <Modal
                title="Sư Kiện"
                onCancel={handleCancelShowAddEvent}

                footer={null
                }
                width={650}
                style={{ top: 100
                }}
                bodyStyle={{height: "auto"}}
                destroyOnClose={true}
                open={showAddEvent.show}
            >
                <AddEvent start={showAddEvent.start} end={showAddEvent.end}
                          listStaff={listStaff}
                          onCancel={handleCancelShowAddEvent} onSave={handleCreateEvent} />
            </Modal>
            <Modal
                title="Cập Nhật Sư Kiện"
                onCancel={handleCancelShowEvent}
                footer={null
                }
                width={650}
                style={{ top: 100 ,
                }}
                bodyStyle={{height: "auto"}}
                destroyOnClose={true}
                open={showEvent.show}
            >
                <EditEvent event={showEvent.event} onCancel={handleCancelShowEvent} onSave={handleUpdateEvent} onDelete={handleDeleteEvent} />
            </Modal>
        </div>
    );
}

export default ManageSchedule;