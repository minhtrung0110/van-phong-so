import React, {useCallback, useMemo, useState} from 'react';
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
ManageSchedule.propTypes = {

};

function ManageSchedule(props) {
    const [myEvents, setEvents] = useState([])
    const [showEvent,setShowEvent] = useState({event:null,show:false})
    const [showAddEvent,setShowAddEvent] = useState({start:null,end:null,show:false})
    const handleCancelShowEvent = ()=>{
        setShowEvent({...showEvent,show: false})
    }
    const handleCancelShowAddEvent = ()=>{
        setShowAddEvent({...showAddEvent,show: false})
    }
    const events = [
        {
            title: 'Chơi Gái',
            type: 'reminder',
            notification:'1',
            repeat:0,
            start: new Date(2023, 2, 18, 10, 0),
            end: new Date(2023, 2, 20, 12, 0),
        },
        {
            title: 'Họp Dự Án ',
            type: 'event',
            description: 'Làm nhanh đi',
            file:'',
            members: [],
            notification:'120',
            repeat:1,
            start: new Date(2023, 2, 21, 10, 0),
            end: new Date(2023, 2, 28, 12, 0),
        },
        {
            title: 'Đánh Cầu Lông',
            type: 'schedule',
            notification:'3',
            repeat:0,
            start: new Date(2023, 2, 28, 10, 0),
            end: new Date(2023, 2, 28, 12, 0),
            description: 'Mô tả sự kiện B'
        },
        {
            title: 'Sự kiện bắn súng',
            type: 'reminder',
            notification:'60',
            repeat:1,
            start: new Date(2023, 2, 1, 10, 0), // Ngày bắt đầu
            end: new Date(2023, 2, 12, 12, 0), // Ngày kết thúc
            rrule: {
                freq: 'weekly',
                interval: 1,
                byweekday: [moment.weekdays().indexOf('Wednesday')],
                dtstart: new Date(2023, 2, 1),
                until: new Date(2023, 4, 1),
            },
        },
        // ...
    ];

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
            defaultDate: new Date(2023, 2, 12),
            scrollToTime: new Date(2023, 1, 1, 6),
        }),
        []
    )
    const handleCreateEvent=(data) => {
        console.log('Create event: ', data)
    }
    const handleUpdateEvent=(data) => {
        console.log('Update event: ', data)
    }
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: event.color,
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
            width:'100%',
            verticalAlign: 'middle'
        };
        return {
            style: style,
            title: event.title,
            type:event.type,
            description: event.description,
            files:event.files,
            members:event.members,
            notification:event.notification,
            repeats:event.repeat,
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
                style={{ top: 100   }}
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
                style={{ top: 100   }}
                bodyStyle={{height: "auto"}}
                destroyOnClose={true}
                open={showEvent.show}
            >
                <EditEvent event={showEvent.event} onCancel={handleCancelShowEvent} onSave={handleUpdateEvent} />
            </Modal>
        </div>
    );
}

export default ManageSchedule;