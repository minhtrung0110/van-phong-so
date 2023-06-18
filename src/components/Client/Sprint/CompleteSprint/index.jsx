import React from 'react';
import PropTypes from 'prop-types';
import {FaChartLine, FaStarOfDavid, FaTrophy} from "react-icons/fa";
import './style.scss'
import dayjs from "dayjs";
import {isEmpty} from "lodash";
CompleteSprint.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
};

function CompleteSprint({sprint,onCancel,onComplete}) {
    const total =!isEmpty(sprint.tasks) ?sprint.tasks.length:0
    const tasksDone =!isEmpty(sprint.tasks) ? sprint.tasks.reduce((acc, task) => {
        if (task.board_column_id === 9) {
            return acc + 1;
        } else {
            return acc;
        }
    }, 0):0;
    const currentDate = dayjs();
    const duration = currentDate.diff(sprint.start_date, 'hour');
    const numberOfDays=Math.floor(duration/24)
    const numberOfHours =duration%24
    return (
        <div className='notify-complete-sprint'>
            <div className='header-complete-sprint'>
                <div className='info-title'>
                    <FaTrophy className="icon"/>
                    <span className={'title'}>Hoàn Thành Chu Kỳ</span>
                </div>
            </div>
            <div className='content-complete-sprint'>
                <h4 className={'title'}><FaChartLine className='icon' />Thống Kê</h4>
                <ul className={'statistics'}>
                    <li className={'statistic-item'}> <FaStarOfDavid className={'icon-statistic-item'} />
                     Tổng Số Công Việc:   <span className={'result-statistic-item'}>{total}</span>
                    </li>
                    <li className={'statistic-item'}><FaStarOfDavid className={'icon-statistic-item'} />
                        Công Việc Hoàn Thành:  <span className={'result-statistic-item'}>{tasksDone}</span>
                    </li>
                    <li className={'statistic-item'}><FaStarOfDavid className={'icon-statistic-item'} />
                        Thời Gian Triển Khai:  <span className={'result-statistic-item'}>
                            {numberOfDays>0?`${numberOfDays} ngày ${numberOfHours} giờ`:`${numberOfHours} giờ`}
                    </span>
                    </li>
                </ul>
                <span className={'description'}>
                            Các công việc chưa hoàn thành sẽ được duy chuyển vào <b>Lưu Trữ</b>.
                        </span>
            </div>
            <div className={'footer-complete-sprint'}>
                <button className={'btn-complete'} onClick={onComplete}>Hoàn Thành</button>
                <button className={'btn-cancel'} onClick={() => onCancel(false)}>Hủy</button>
            </div>

        </div>
    );
}

export default CompleteSprint;