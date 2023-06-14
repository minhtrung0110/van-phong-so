import React from 'react';
import "./TaskItem.scss";
import {FaPen, FaUser} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {setDetailTask} from "~/redux/reducer/project/projectReducer";
import {findStyleForStatusTask, getTitleStatusTask} from "~/utils/sorts";
import {listPriority} from "~/asset/data/defaullt_data_task";
import AvatarCustom from "~/components/commoms/AvatarCustom";
import {Tooltip} from "antd";

function TaskItem({task,type,columns, onShowDetail}) {
  // console.log( 'Test Lỗi:', getTitleStatusTask(task.board_column_id,columns))
    const dispatch = useDispatch()
    const handleShowDetail = () => {
        dispatch(setDetailTask(task))
        onShowDetail(true)
    }
    const stylePriority=findStyleForStatusTask(task.priority,listPriority)
    return (
        <div className={`task-item ${type === 'long' ? 'task-long' : ''}`} onClick={handleShowDetail}>
            <div className={`header-task-item ${type==='long'?'flex-task':''}`}>
                <div className='task-title'>{`${task.title}`}</div>
                <div className={`description ${type==='long'?'space-around':''}`}>
                    {
                        type==='long' && (
                          <>
                              {
                                  task.assignee_employee.id===0 ?(
                                        <Tooltip  ><span className={'unsigned'}> <FaUser className={'icon'} /></span></Tooltip>
                                  ):(
                                      <AvatarCustom avatar={task.assignee_employee.avatar_url} size={'small'} lastName={task.assignee_employee.last_name} />
                                  )
                              }
                            <span className='status'>{
                             getTitleStatusTask(task.board_column_id,columns).name
//'Todo'
                            }</span>
                          </>
                        )
                    }
                    <span className='priority'
                          style={{
                              backgroundColor: stylePriority.backgroundColor,
                              color: stylePriority.color
                          }}
                    >{stylePriority.label}</span>
                    <span className='id'>{`id: ${task.id} sort: ${task.sort}`}</span>
                </div>
                {/*<FaPen className='btn-edit-project'/>*/}
            </div>
            {!!task.cover && (
                <div className='thumbnail'>
                    <img src={task.cover} alt='img' className='img-thumbnail-task'/>
                </div>)
            }


        </div>
    );
}

export default TaskItem;