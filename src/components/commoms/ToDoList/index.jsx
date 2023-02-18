import { List } from 'antd';
import styles from './ToDoList.module.scss'
import classNames from "classnames/bind";
import React, {useState} from "react";
import {isEmpty} from "lodash";
import {FaPlus} from "react-icons/fa";
import ToDoItem from "~/components/commoms/ToDoList/ToDoItem";

const cx=classNames.bind(styles)
function TodoList(props) {
    const list=[
        {id:1,name:'Lập Kịch Bản',status:false,isNew:false},
        {id:2,name:'Mua Đao Cu',status:false,isNew:false}
    ]
    const [listToDo,setListToDo] = useState([])
    const [listToDoDone,setListToDoDone] = useState([])
    const [isAddItem,setIsAddItem] = useState(false)
    const handleAddToDoItem=()=>{
        setListToDo([...listToDo,{id:listToDo.length+1,name:'',status:false,isNew:true}])
        setIsAddItem(true)
    }
    return (
        <div className={cx('todo-list')}>
            {
               !isEmpty(listToDo) && (
                    <div className={cx('todo-container')}>
                        <p>Danh Sách Công Việc Cần Làm ({`${!!listToDoDone.length ?listToDoDone.length:0}/${listToDo.length}`})</p>
                        <List
                            dataSource={listToDo}
                            renderItem={item => (
                                <List.Item>
                                    <ToDoItem data={item} isEdit={item.isNew} />
                                </List.Item>
                            )}
                        />
                    </div>
                )
            }
            <button className={cx('btn-add-todo-item')} onClick={handleAddToDoItem}>
                <FaPlus className={cx('icon')} /> <span className={cx('title')}>Thêm Công Việc</span>
            </button>
        </div>

    );
}

export default TodoList;
