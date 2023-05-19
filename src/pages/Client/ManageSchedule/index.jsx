import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from "moment";
import 'moment/locale/vi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Modal} from "antd";
import EditProject from "~/components/Client/Project/EditProject";
import EventItem from "~/components/Client/Schedule/AddEvent";
import AddEvent from "~/components/Client/Schedule/AddEvent";
import EditEvent from "~/components/Client/Schedule/EditEvent";
import {getListDepartments} from "~/api/Client/Department/departmentAPI";
import {setExpiredToken} from "~/redux/reducer/auth/authReducer";
import {deleteCookie, getCookies} from "~/api/Client/Auth";
import {getListEvents} from "~/api/Client/Calendar";
import {useDispatch} from "react-redux";
ManageSchedule.propTypes = {

};

function ManageSchedule(props) {
    const [myEvents, setEvents] = useState([])
    const [showEvent,setShowEvent] = useState({event:null,show:false})
    const [loading, setLoading] = React.useState(false);
    const [showAddEvent,setShowAddEvent] = useState({start:null,end:null,show:false})
    const dispatch=useDispatch()
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
    };
    const setEvent = (respond, value) => {
        setEvent(respond.results);
    };
    useEffect(() => {
        async function fetchDataEvents() {
            const respond = await getListEvents();
            console.log('Data respond:', respond)
            if (respond === 401) {
                handleSetUnthorization();
                return false;
            } else if (respond === 500) {
                setEvent([])
                return false;
            } else {
                setEvent(respond);
            }
            setLoading(false);
        }
        fetchDataEvents();
    }, []);
    const localizer = momentLocalizer(moment);

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
            defaultDate: new Date(2023, 4, 1),
            scrollToTime: new Date(2023, 5, 30, 6),
        }),
        []
    )
    const handleCreateEvent=(data) => {
        console.log('Create event: ', data)
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
    return (
        <div  className='container-schedule'>
            <Calendar
                className='calendar'
                defaultDate={defaultDate}
                defaultView={Views.MONTH}
                events={events}
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
                <AddEvent start={showAddEvent.start} end={showAddEvent.end} onCancel={handleCancelShowAddEvent} onSave={handleCreateEvent} />
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