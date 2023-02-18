import { List } from 'antd';
import styles from './ToDoList.module.scss'
import classNames from "classnames/bind";
import React, {useEffect, useState} from "react";
import {isEmpty} from "lodash";
import {FaPlus} from "react-icons/fa";
import ToDoItem from "~/components/commoms/ToDoList/ToDoItem";

const cx=classNames.bind(styles)
function TodoList(props) {
    const list=[
        {id:1,name:'Lập Kịch Bản',status:false,isNew:false},
        {id:2,name:'Mua Đao Cu',status:false,isNew:false}
    ]
    const [listToDo,setListToDo] = useState(list)
    const [listToDoDone,setListToDoDone] = useState([])
    const [isAddItem,setIsAddItem] = useState(false)
    const handleAddToDoItem=()=>{
        setListToDo([...listToDo,{id:listToDo.length+1,name:'',status:false,isNew:true}])
        setIsAddItem(true)
    }
    const handleUpdateToDoItem=(item)=>{

        const newListToDo=listToDo.map((obj)=>{
            if(obj.id===item.id){
                return item;
            }
            return obj
        })
        setListToDo(newListToDo)
        console.log('New TodoList: ',newListToDo)

    }
    const handleRemoveToDoItem=(item)=>{
        console.log(item)
        const newListToDoRemove=listToDo.filter((obj)=>(item.id!==obj.id))
        setListToDo(newListToDoRemove)
    }
    // useEffect(()=>{
    //
    // },[listToDo])
    return (
        <div className={cx('todo-list')}>
            {
               !isEmpty(listToDo) && (
                    <div className={cx('todo-container')}>
                        <p>Danh Sách Công Việc Cần Làm ({`${listToDo.reduce((acc, item)=>(item.status===true)?acc+1:acc,0)}/${listToDo.length}`})</p>
                        <List
                            dataSource={listToDo}
                            renderItem={item => (
                                <List.Item>
                                    <ToDoItem data={item} isEdit={item.isNew}
                                              onUpdate={handleUpdateToDoItem} onDelete={handleRemoveToDoItem}/>
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
