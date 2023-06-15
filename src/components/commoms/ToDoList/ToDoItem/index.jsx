import React, {memo, useEffect, useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Input} from "antd";
import styles from './ToDoItem.module.scss'
import classNames from "classnames/bind";
import {isEmpty} from "lodash";
import {FaEllipsisH, FaTrash, FaTrashAlt} from "react-icons/fa";
ToDoItem.propTypes = {

};
const cx=classNames.bind(styles)
function ToDoItem({data,onCreate,onUpdate,onDelete}) {
    console.log('ToDoItem:',data)
    const inputRef=useRef();
    const [isChecked,setIsChecked]=useState(data.status)
    const [valueInput,setValueInput]=useState(data.name)
    const [isAdd,setIsAdd]=useState(data.isNew)
    const [isUpdate,setIsUpdate]=useState(false)
    const onChange = (e) => {
        setIsChecked(!isChecked)
        onUpdate({...data,status:!isChecked})
    };
    const selectAllInlineTex = (e) => {
        e.target.focus();
        e.target.select()
        setIsUpdate(true)
    }
    useEffect(() => {
       if(isAdd){
           if (!isEmpty(inputRef.current)) {
               inputRef.current.focus();
           }
       }
    }, [inputRef]);// chờ đợi khi nào input dc render mới chạy callback
    const handleCancelAddItem=()=>{
        if(isAdd){
           // onDelete({...data})
            setIsAdd(false)
        }
        else if(isUpdate){
            setIsUpdate(false)
        }
    }
    const handleSaveItem=()=>{
        if(isAdd){
            onCreate({...data,name:valueInput,status:isChecked,isNew:false})
            setIsAdd(false)
        }
        else if(isUpdate){
            onUpdate({...data,name:valueInput,status:isChecked})
            setIsUpdate(false)
        }


    }
    const handleRemoveItem=()=>{
       onDelete({...data})
    }
    const handleOnKeyDown=(e)=>{
      if(e.key==='Enter'){
          handleSaveItem()
          e.target.blur();
      }
    }
    return (
        <div className={cx('todo-item')}>
           <div className={cx('box')}>
               <Checkbox onChange={onChange} className={cx('todo-item-content')} checked={!!isChecked}>
                   <Input ref={inputRef} value={valueInput} onClick={selectAllInlineTex}
                          className={cx('todo-item-input',`${isChecked?'checked':''}`)}
                          placeholder='Thêm việc cần làm ...'
                          onChange={(e) =>setValueInput(e.target.value)}
                          onKeyDown={event => handleOnKeyDown(event)}
                   />

               </Checkbox>
               {
                   (isAdd || isUpdate) && (
                       <div className={cx('todo-item-save')}>
                           <button className={cx('btn-save')} onClick={handleSaveItem}>{isAdd ?'Tạo':'Lưu'}</button>
                           <button className={cx('btn-cancel')} onClick={handleCancelAddItem}>Hủy</button>
                       </div>
                   )
               }
           </div>
            {
                ( !isAdd && !isUpdate) && (
                    <FaTrashAlt onClick={handleRemoveItem} className={cx('more')}/>
                )
            }
        </div>

    );
}

export default memo(ToDoItem);