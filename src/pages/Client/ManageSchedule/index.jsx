import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Modal} from "antd";
import EditProject from "~/components/Client/Project/EditProject";
import EventItem from "~/components/Client/Schedule/EventItem";
ManageSchedule.propTypes = {

};

function ManageSchedule(props) {
    const [myEvents, setEvents] = useState([])
    const [showEvent,setShowEvent] = useState({event:null,show:false})
    const handleCancelShowEvent = ()=>{
        setShowEvent({...showEvent,show: false})
    }
    const events = [
        {
            title: 'Sự kiện A',
            start: new Date(),
            end: new Date(),
            description: 'Mô tả sự kiện A'
        },
        {
            title: 'Họp Dự Án ',
            type: 'event',
            description: '',
            file:'',
            members: [],
            notifications:true,
            repeats:true,
            start: new Date(),
            end: new Date(),
        },
        {
            title: 'Sự kiện B',
            start: new Date(),
            end: new Date(),
            description: 'Mô tả sự kiện B'
        },
        {
            title: 'Sự kiện lặp lại',
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

    // const events = [
    //     {
    //         title: 'Họp Dự Án ',
    //         type: 'event',
    //         description: '',
    //         file:'',
    //         members: [],
    //         notifications:true,
    //         repeats:true,
    //         start: moment('2023-02-25 09:00:00'),
    //         end: moment('2023-02-25 10:00:00'),
    //     },
    //     {
    //         title: 'Hoàn Thành Lịch Biểu ',
    //         type: 'todo',
    //         description: '',
    //         notifications:true,
    //         repeats:true,
    //         start: moment('2023-02-25 09:00:00'),
    //         end: moment('2023-02-25 10:00:00'),
    //     },
    //     {
    //         title: 'Đóng Tiền Nước ',
    //         type: 'reminder',
    //         notifications:true,
    //         repeats:true,
    //         start: moment('2023-02-25 09:00:00'),
    //         end: moment('2023-02-25 10:00:00'),
    //     },
    // ];
    const localizer = momentLocalizer(moment);

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            const title = window.prompt('New Event Name')
            if (title) {
                setEvents((prev) => [...prev, { start, end, title, allDay:true }])
            }
        },
        [setEvents]
    )

    const handleSelectEvent = useCallback(
        (event) => {
            setShowEvent({event: event,show: true})
            console.log(event)
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
                onCancel={handleCancelShowEvent}
                footer={null
                }
                width={600}
                style={{ top: 100   }}
                bodyStyle={{height: "500px"}}

                open={showEvent.show}
            >
                <EventItem event={showEvent.event} />
            </Modal>
        </div>
    );
}

export default ManageSchedule;