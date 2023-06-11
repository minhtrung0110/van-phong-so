import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import AvatarCustom from "~/components/commoms/AvatarCustom";
import { Modal, Upload} from "antd";
import {FaCaretDown, FaPaperclip} from "react-icons/fa";
import CustomEditor from "~/components/commoms/Edittor";
import {isEmpty} from "lodash";
import {useSelector} from "react-redux";
import {getUserSelector} from "~/redux/selectors/auth/authSelector";
import {getCookies} from "~/api/Client/Auth";
import axiosClient from "~/api/axiosClient";
AddPost.propTypes = {

};

function AddPost({author,onSave}) {
    const [showAdd,setShowAdd]=useState(false)
    const [errorDescription, setErrorDescription] = useState('');
    const [description,setDescription] = useState('')
    const [uploadAvatarURL, setUploadAvatarURL] = useState([]);
    const [listFile, setListFile] = useState([])
    const editorDescription = (value) => {
        setDescription(value);
        setErrorDescription('');
    };
    const handleChangeUpload = (info) => {
        setListFile(info.fileList)
    }
    const userLogin=useSelector(getUserSelector)
    const handleHiddenListFile = () => {
        const elements = document.querySelector('.attach-file .ant-upload-list');
        const icon = document.querySelector('.attach-file .title-upload .icon');

        if (elements.style.display !== 'none') {
            elements.style.display = 'none';
            icon.classList.toggle('rotate');
        } else {
            elements.style.display = 'block';
            icon.classList.toggle('rotate');
        }
    }
    const handleSubmit=() => {
        const postItem={
            company_id: 1,
            content: description,
            created_by_id: userLogin.id,
            posts_images: uploadAvatarURL.map((item,index)=>( {
                id: index+1,
                image_url: item.imageUrl,
                sort: index+1
            }))
        }
        onSave(postItem)
        setDescription('')
        setListFile([])
      //  setShowAdd(false)

    }
    console.log('Test upload trả về :',uploadAvatarURL)
    const handleUploadImages=(images)=>{

    }
    const handleUpload = (options) => {
        const {onSuccess, onError, file, onProgress} = options;
        // const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiVm8gVGh1YW4iLCJhdmF0YXJfdXJsIjoiIiwiZGVwYXJ0bWVudF9pZCI6MSwicGVybWlzc2lvbiI6W3sibmFtZSI6IlNwcmludCIsInBlcm1pc3Npb24iOnsic3ByaW50LmNyZWF0ZSI6dHJ1ZSwic3ByaW50LmRlbGV0ZSI6dHJ1ZSwic3ByaW50LnVwZGF0ZSI6dHJ1ZSwic3ByaW50LnZpZXciOnRydWV9fSx7Im5hbWUiOiJUYXNrIiwicGVybWlzc2lvbiI6eyJ0YXNrLmNyZWF0ZSI6dHJ1ZSwidGFzay5kZWxldGUiOnRydWUsInRhc2sudXBkYXRlIjp0cnVlLCJ0YXNrLnZpZXciOnRydWV9fSx7Im5hbWUiOiJTdGFmZiIsInBlcm1pc3Npb24iOnsic3RhZmYuY3JlYXRlIjp0cnVlLCJzdGFmZi5kZWxldGUiOnRydWUsInN0YWZmLnVwZGF0ZSI6dHJ1ZSwic3RhZmYudmlldyI6dHJ1ZX19LHsibmFtZSI6IlByb2plY3QiLCJwZXJtaXNzaW9uIjp7InByb2plY3QuY3JlYXRlIjp0cnVlLCJwcm9qZWN0LmRlbGV0ZSI6dHJ1ZSwicHJvamVjdC51cGRhdGUiOnRydWUsInByb2plY3QudmlldyI6dHJ1ZX19XX0sImV4cCI6MTY4NDI2NTAzOSwiaWF0IjoxNjg0MjM2MjM5fQ.VPzwQy42yHkWoD1y3FPMSXBPSbylpL2BKml9zi_K33XSetwJJOTXsS5g7rtgDByl6K5QJaEsvYK3-WrgbUHL0UCo6uMtbgbwqr70u1B8oN5R8UVATwFqhCjVDlyMLHLT6ozrCyKGX-lqLWmvbbngiVavnYZa2bBSQg_of9c_E69ey17UntyMZ9gXEoaV4KPFZReaJKskMWJPnt1vKlHSAho-OmmglruKR-lhXcpzbJx8iKCj1MNvWvqLYfoXdzsRb3bHuccHP84_baUou-B0P3efGCQajyBilCoInL4LSukl0Hb62jACg769WXekKCXYqmYJi5TN9fL0SCoUgmrjHw'; // Thay thế bằng mã thông báo truy cập hợp lệ của bạn
        const token = getCookies('vps_token');
        const formData = new FormData();
        formData.append('file', file);
        axiosClient.post('http://127.0.0.1:8080/api/v1/image/upload', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                onProgress({percent: percentCompleted});
            },
        })
            .then((response) => {
                // Xử lý phản hồi từ máy chủ sau khi tải lên thành công
                onSuccess(response.data);
                setUploadAvatarURL(prev=>[...prev,response.data.result])
            })
            .catch((error) => {
                // Xử lý lỗi tải lên
                onError(error);
            });
    };
    return (
        <div className='create-post-container'>
           <div className='post-item-create'>
               <div className='post-head'>
                   <div className='post-user'>
                       <AvatarCustom lastName={author.last_name} avatar={author.avatar} className={'post-avatar'} />
                   </div>
                   <div className={'post-input'} onClick={()=>setShowAdd(true)}>
                       {author.last_name} ơi ! Bạn đang nghĩ gì thế ?
                   </div>

               </div>
           </div>
            <Modal title="" open={showAdd}
                   maskClosable={true}
                   destroyOnClose={true}
                   onCancel={()=>setShowAdd(false)}
                   footer={null}
                   width={700}
                   style={{top: 50}}
            >
                <div className={'form-create-post'}>
                    <div className='post-head'>
                        <div className='post-user'>
                            <AvatarCustom lastName={author.last_name} avatar={author.avatar} className={'post-avatar'} />
                        </div>
                        <span className={'post-name-author'}>
                            {`${author.first_name} ${author.last_name}`}
                        </span>

                    </div>
                    <div className='post-content'>
                        <CustomEditor id="description" editorDescription={editorDescription}/>
                        <div className='attach-file'>
                            <Upload
                                customRequest={handleUpload}
                                listType="picture"
                                fileList={listFile}
                                multiple
                                onChange={handleChangeUpload}
                            >
                                <button className='btn-upload'>
                                    <FaPaperclip className='icon' />
                                    <span className='title'>Tải lên tệp đính kèm</span>
                                </button>
                            </Upload>
                            {!isEmpty(listFile) && (<div className='title-upload'>Tệp đính kèm ({listFile.length})
                                <FaCaretDown className='icon' onClick={handleHiddenListFile}/>
                            </div>)}
                        </div>
                    </div>
                    <div className='footer'>
                        <button type="button" className={'btn-save'}
                                onClick={handleSubmit}
                        >
                            Đăng
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}

export default AddPost;