import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Input} from "antd";
import styles from './ToDoItem.module.scss'
import classNames from "classnames/bind";
import {isEmpty} from "lodash";
ToDoItem.propTypes = {

};
const cx=classNames.bind(styles)
function ToDoItem({data,isEdit}) {
    const inputRef=useRef();
    const [isChecked,setIsChecked]=useState(data.status)
    const onChange = (e) => {
        setIsChecked(!isChecked)
    };
    const selectAllInlineTex = (e) => {
        e.target.focus();
        e.target.select()
    }
    useEffect(() => {
       if(isEdit){
           if (!isEmpty(inputRef.current)) {
               inputRef.current.focus();
           }
       }
    }, [inputRef]);// chờ đợi khi nào input dc render mới chạy callback

    return (
        <div className={cx('todo-item',`${isEdit?'editable':''}`)}>
            <Checkbox onChange={onChange} className={cx('todo-item-content')} checked={isChecked}>
                <Input ref={inputRef} value={data.name} onClick={selectAllInlineTex}
                       className={cx('todo-item-input',`${isChecked?'checked':''}`)}
                        placeholder='Thêm việc cần làm ...'
                />
            </Checkbox>
            {
                isEdit && (
                    <div className={cx('todo-item-add')}>
                        <button className={cx('btn-add')}>Tạo</button>
                        <button className={cx('btn-cancel')}>Hủy</button>
                    </div>
                )
            }
        </div>
    );
}

export default ToDoItem;