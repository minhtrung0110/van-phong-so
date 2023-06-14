import {List, message} from 'antd';
import styles from './ToDoList.module.scss'
import classNames from "classnames/bind";
import React, {useEffect, useState} from "react";
import {isEmpty} from "lodash";
import {FaPlus} from "react-icons/fa";
import ToDoItem from "~/components/commoms/ToDoList/ToDoItem";
import {createSubTask, createTask, deleteSubTask, editSubTask} from "~/api/Client/Task/taskAPI";

const cx=classNames.bind(styles)
function TodoList({list,taskId,onUpdate,onCreate}) {
    // const list=[
    //     {id:1,name:'Lập Kịch Bản',status:false,isNew:false},
    //     {id:2,name:'Mua Đao Cu',status:false,isNew:false}
    // ]
    const [listToDo,setListToDo] = useState(list)
    const [messageApi, contextHolder] = message.useMessage();
    const [listToDoDone,setListToDoDone] = useState([])
    const [isAddItem,setIsAddItem] = useState(false)
    const handleAddToDoItem=()=>{
        setListToDo([...listToDo,{id:listToDo.length+1,name:'',status:false,isNew:true}])
        setIsAddItem(true)
    }
    const handleUpdateToDoItem=async (item) => {
        const newListToDo = listToDo.map((obj) => {
            if (obj.id === item.id) {
                return item;
            }
            return obj
        })
        if (await handleCallAPICUpdateToDoItem(item)) {
            setListToDo(newListToDo)
            onUpdate(newListToDo)
        } else {
            messageApi.open({
                type: 'error',
                message: 'Lỗi vui lòng tải lại trang',
                duration: 1.3
            })
        }
    }
    const handleCallAPICreateToDoItem=async (item) => {
        console.log('Create todo:',{
            name: item.name,
            status: item.status,
            task_id:taskId
        })
        const result = await createSubTask({
            name: item.name,
            status:  item.status,
            task_id:taskId
        })
        return result.status===1;
    }
    const handleCallAPICUpdateToDoItem=async (item) => {
        console.log('Update todo:',{
            id: item.id,
            name: item.name,
            status: item.status,
            task_id:taskId
        })
        const result = await editSubTask({
            id: item.id,
            name: item.name,
            status: item.status,
            task_id:taskId
        })
        return result.status===1;
    }
    const handleCallAPIDeleteToDoItem=async (id) => {
        console.log('Delete todo:',id)
        const result = await deleteSubTask(id)
        return result.status===1;
    }
    const handleCreateToDoItem=async(item)=>{
        const newListToDo=listToDo.map((obj)=>{
            if(obj.id===item.id){
                return item;
            }
            return obj
        })
        if(await handleCallAPICreateToDoItem(item)){
            setListToDo(newListToDo)
            onUpdate(newListToDo)
        }else {
            messageApi.open({
                type:'error',
                message:'Lỗi vui lòng tải lại trang',
                duration:1.3
            })
        }
    }
    const handleRemoveToDoItem=async (item) => {
        const newListToDoRemove = listToDo.filter((obj) => (item.id !== obj.id))
        if (await handleCallAPIDeleteToDoItem(item.id)) {
            setListToDo(newListToDoRemove)
        } else {
            messageApi.open({
                type: 'error',
                message: 'Lỗi vui lòng tải lại trang',
                duration: 1.3
            })
        }

    }
    // useEffect(()=>{
    //
    // },[listToDo])
    return (
        <div className={cx('todo-list')}>
            {contextHolder}
            {
               !isEmpty(listToDo) && (
                    <div className={cx('todo-container')}>
                        <p>Danh Sách Công Việc Cần Làm ({`${listToDo.reduce((acc, item)=>(item.status===true)?acc+1:acc,0)}/${listToDo.length}`})</p>
                        <List
                            dataSource={listToDo}
                            renderItem={item => (
                                <List.Item>
                                    <ToDoItem data={item} isEdit={item.isNew} onCreate={handleCreateToDoItem}
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
