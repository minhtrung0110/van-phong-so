import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {DatePicker, Modal, Select} from "antd";
import {useSelector} from "react-redux";
import {detailStaffSelector} from "~/redux/selectors/task/taskSelector";
import {FaDesktop} from "react-icons/fa";
import './Detail.scss'
import dayjs from "dayjs";
import CustomEditor from "~/components/commoms/Edittor";

DetailTask.propTypes = {};

function DetailTask() {
    const data = useSelector(detailStaffSelector)
    const [errorDescription, setErrorDescription] = useState('');
    const { RangePicker } = DatePicker;
    const rangePresets = [
        {
            label: 'Last 7 Days',
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: 'Last 14 Days',
            value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
            label: 'Last 30 Days',
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: 'Last 90 Days',
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];
    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    }
    const editorDescription = (value) => {
      //  setValue('description', value);nay2y2 cho form
        setErrorDescription('');
    };
    const listPriority=[
        {
            value: 'Ưu tiên cao',
            label: 'Ưu tiên cao',
        },
        {
            value: 'Ưu tiên trung bình',
            label: 'Ưu tiên trung bình',
        },
        {
            value: 'Ưu tiên thấp',
            label: 'Ưu tiên thấp',
        },
        {
            value: 'Không ưu tiên',
            label: 'Không ưu tiên',
        },
    ]
    return (
        <div className='detail-task'>
            <div className='header'>
                <div className='name-task'>
                    <FaDesktop/>
                    <h4>{data.title}</h4>
                </div>
            </div>
            <div className='content'>
                <div className='gr-01'>
                    <div className='duration'>
                        <RangePicker
                            presets={rangePresets}
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={onRangeChange}
                        />

                    </div>
                    <div className='priority'>
                        <Select
                            defaultValue="Không ưu tiên"
                            style={{
                                width: 180,
                            }}
                            options={listPriority}
                        />
                    </div>
                </div>
                <div className='gr-02'>
                    <div className='members'>

                    </div>
                    <div className='notification'>

                    </div>

                </div>

            </div>

            <div className='description'>
                <CustomEditor id="description" editorDescription={editorDescription} />
            </div>
            <div className='todo-list'>

            </div>
            <div className='attach-file'>

            </div>
            <div className='activity-task'>
                <div className='description'>

                </div>
                <div className='comment'>

                </div>
            </div>


            <div className='footer'></div>
        </div>
    )
        ;
}

export default DetailTask;