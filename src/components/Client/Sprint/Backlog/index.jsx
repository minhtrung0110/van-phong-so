// import React, {useState} from 'react';
// import PropTypes from 'prop-types';
// import {FaAngleDown, FaEllipsisH, FaPlus, FaTimes} from "react-icons/fa";
// import {conCatArrayInArray, getTotalTaskInColumn} from "~/utils/sorts";
// import {Dropdown} from "antd";
// import TaskItem from "~/components/Client/Task/Card/TaskItem";
// import TextArea from "antd/es/input/TextArea";
//
// Backlog.propTypes = {
//
// };
//
// function Backlog({backlog=[]}) {
//     const [isOpen, setIsOpen] = useState(false)
//     return (
//         <div className='backlog-box'>
//             <div className='sprint-header'>
//                 <div className='sprint-info' onClick={() => setIsOpen(!isOpen)}>
//                     <FaAngleDown className={`icon ${isOpen ? 'rotated' : ''}`}/>
//                     <div className='sprint-name'>Lưu Trữ</div>
//                     <div className='total-task'>{`( ${backlog.length} công việc )`}</div>
//
//                 </div>
//                 <div className='sprint-action'>
//                     <div className='sprint-status'>
//                         {
//                             listStatus.map((item,index)=>(
//                                 <span key={index} className={`status-${item.id}`}>1</span>
//
//                             ))
//                         }
//                     </div>
//                     <button className={`action-sprint ${sprint.status===1?'on':'off'}`} onClick={handleRunSprint}>
//                         {sprint.status === 0 ? 'Bắt Đầu' : 'Hoàn Thành'}
//                     </button>
//                     <Dropdown
//                         menu={{
//                             items:listOptions,
//                             onClick:handleOnClick,
//                         }}
//                         trigger={['click']}
//                     >
//                         <button className='btn-action'><FaEllipsisH className='dot'/></button>
//                     </Dropdown>
//
//                 </div>
//             </div>
//             {!!isOpen && (<div className='sprint-content'>
//
//                     <div className={`list-task ${sprint.columns.length>0 ?'':'dashed'}`}>
//                         {
//                             conCatArrayInArray(sprint.columns).map((task,index) =>(
//                                 <TaskItem key={index} task={task} type={'long'} />
//                             ))
//                         }
//
//                     </div>
//
//                     {
//                         isCreateTask && (
//                             <div className='create-new-task-area'>
//                                 <TextArea rows={3}
//                                           placeholder='Nhập công việc'
//                                           className='input-enter-card'
//                                           value={valueNewTask}
//                                           onChange={e => setValueNewTask(e.target.value)}
//                                     // ref={newCardRef}
//                                           onKeyDown={event => (event.key === 'Enter') && handleCreateTask()}
//                                 />
//
//
//                                 <div className='box-btn'>
//                                     <button className='btn-create-task'
//                                             onClick={handleCreateTask}
//                                     >Tạo</button>
//                                     <FaTimes className='cancel-new-task'
//                                              onClick={() => setIsCreateTask(false)}
//                                     />
//                                 </div>
//                             </div>
//                         )
//                     }
//                     {
//                         !isCreateTask &&
//                         <button className='add-task' onClick={()=>setIsCreateTask(true)} >
//                             <FaPlus className={'icon-add'}/>
//                             Thêm Công Việc
//                         </button>
//                     }
//                 </div>
//             )}
//         </div>
//     );
// }
//
// export default Backlog;