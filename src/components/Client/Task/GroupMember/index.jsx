import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar, Tooltip} from "antd";
import { FaMale, FaPlus} from "react-icons/fa";
import SearchSelectModal from "~/components/Client/Task/GroupMember/SearchSelectModal";
import {listMembersForTask} from "~/asset/data/initalDataTask";
import './style.scss'
import AvatarCustom from "~/components/commoms/AvatarCustom";

GroupMember.propTypes = {

};

function GroupMember({onMembers,defaultMembers=[],addMember=false,maxCount=4,sizeAvatar='default'}) {
    const [openSelectMember, setOpenSelectMember] = useState(false)
    const [members,setMembers] = useState(defaultMembers)
    const listDefaultColors=['#721e1e',
        '#da7e14',
        '#f3c512',
        '#60d016',
        '#2a58ee',
        '#a110ab',
        '#063b02',
        '#ea0202',
        '#595858',
        '#4cb5cc',
        '#f3116f',]
    // nhớ tối ưu load ảnh avatar hỏi chatGPT
    return (
        <div className='avatar-group'>
            <Avatar.Group
                maxCount={maxCount}
                size={sizeAvatar}
            >

                {
                  !!members &&  members.map((item)=> (
                        <Tooltip title={`${item.first_name} ${item.last_name}`} placement="top" key={item.id}>
                            <AvatarCustom avatar={item.avatar} lastName={item.last_name} />
                            {/*<Avatar src={item.avatar}*/}
                            {/*    style={{*/}
                            {/*        backgroundColor: '#87d068',*/}
                            {/*    }}*/}
                            {/*    icon={<FaMale/>}*/}
                            {/*/>*/}

                        </Tooltip>
                    ))
                }

            </Avatar.Group>

            {
                !!addMember && (
                    <button className='add-member' onClick={()=>setOpenSelectMember(true)}><FaPlus/></button>
                )
            }
            <SearchSelectModal title='Chọn Thành Viên'  listOptions={listMembersForTask}
                               onSubmit={setMembers}            open={openSelectMember} onClose={setOpenSelectMember}/>
        </div>
    );
}

export default GroupMember;