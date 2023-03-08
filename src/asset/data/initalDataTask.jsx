export const  initialData ={
    boards:[
        {
            id:'kltn-01',
            name:'Khóa Luận Tốt Nghiệp',
            columnOrder:['column-1', 'column-2','column-3'],
            columns:[
                {
                    id:'column-1',
                    boardId:'kltn-01',
                    title:'Chuẩn Bị',
                    cardOrder:['card-1', 'card-2','card-3','card-4','card-5'],
                    cards:[
                        {
                            id: 'task-1',
                            boardId:'kltn-01',
                            columnId: 'column-1',
                            title:'Lập Kế Hoạch',
                            description: '',
                            startTime:'01/10/2022 00:10:00',
                            endTime:'31/12/2022 21:00:00',
                            priority:'none',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        },
                        {
                            id:'task-2',
                            boardId:'kltn-01',
                            columnId: 'column-1',
                            title:'Hoc React JS',
                            description: '',
                            startTime:'01/10/2022 00:10:00',
                            endTime:'15/12/2022 21:00:00',
                            priority:'none',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }
                        ,  {
                            id:'task-3',
                            boardId:'kltn-01',
                            columnId: 'column-1',
                            title:'Xem Redux',
                            description: '',
                            startTime:'01/10/2022 00:10:00',
                            endTime:'21/12/2022 21:00:00',
                            priority:'none',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }
                        ,  {
                            id:'task-4',
                            boardId:'kltn-01',
                            columnId: 'column-1',
                            title:'Nắm Yêu Cầu',
                            description: '',
                            startTime:'01/10/2022 00:10:00',
                            endTime:'17/12/2022 21:00:00',
                            priority:'none',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        },
                        {
                            id:'task-5',
                            boardId:'kltn-01',
                            columnId: 'column-1',
                            title:'Lên Bảng Màu',
                            description: '',
                            startTime:'01/10/2022 00:10:00',
                            endTime:'17/12/2022 21:00:00',
                            priority:'none',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }

                    ]
                },
                {
                    id:'column-2',
                    boardId:'kltn-01',
                    title:'Đang Tiến Hành',
                    cardOrder:['card-1', 'card-2','card-3','card-4','card-5'],
                    cards:[
                        {
                            id:'task-1',
                            boardId:'kltn-01',
                            columnId: 'column-2',
                            title:'Xây Nhân Sự',
                            description: '',
                            startTime:'01/10/2022 00:10:00',
                            endTime:'15/12/2022 21:00:00',
                            priority:'highly',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        },
                        {
                            id:'task-2',
                            boardId:'kltn-01',
                            columnId: 'column-2',
                            title:'Thiê Kế Lich Trình',
                            description: '',
                            startTime:'01/01/2023 00:10:00',
                            endTime:'15/03/2023 21:00:00',
                            priority:'middle',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }
                        ,  {
                            id:'task-3',
                            boardId:'kltn-01',
                            columnId: 'column-2',
                            title:'Tạo Dụ Án Github',
                            description: '',
                            startTime:'01/01/2023 00:10:00',
                            endTime:'20/03/2023 21:00:00',
                            priority:'low',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }
                    ]
                },
                {
                    id:'column-3',
                    boardId:'kltn-01',
                    title:'Đã Hoàn Thành',
                    cardOrder:['card-1', 'card-2','card-3','card-4','card-5'],
                    cards:[
                        {
                            id:'task-1',
                            boardId:'kltn-01',
                            columnId: 'column-3',
                            title:'UI Login',
                            description: '',
                            startTime:'01/01/2023 00:10:00',
                            endTime:'11/07/2023 21:00:00',
                            priority:'highly',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        },
                        {
                            id:'task-2',
                            boardId:'kltn-01',
                            columnId: 'column-3',
                            title:'UIBase DashBoard',
                            description: '',
                            startTime:'01/01/2023 00:10:00',
                            endTime:'20/07/2023 21:00:00',
                            priority:'highly',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }
                        ,  {
                            id:'task-3',
                            boardId:'kltn-01',
                            columnId: 'column-3',
                            title:'Đề Cương Khóa Luận',
                            description: 'Chú Ý xác định đúng đối tượng và tập trung vào quy trình doanh nghiệp',
                            startTime:'01/02/2023 00:10:00 ',
                            endTime:'20/02/2023 20:00:00 21:00:00',
                            priority:'highly',
                            members:[],
                            todoList:[
                                {id:1,name:'Lập Kịch Bản',status:false,isNew:false},
                                {id:2,name:'Viết Mục Tiêu',status:false,isNew:false}
                            ],
                            fileList:[],
                            comments:[],
                        },
                        {
                            id:'task-3',
                            boardId:'kltn-01',
                            columnId: 'column-3',
                            title:'Tham Khảo UI',
                            description: '',
                            startTime:'01/1/2023 00:10:00',
                            endTime:'01/02/2023 21:00:00',
                            priority:'middle',
                            members:[],
                            todoList:[],
                            fileList:[],
                            comments:[],
                        }


                    ]
                }
            ]
        }
    ]
}

export const listMembersForTask =[
    {
        id: 1,
        first_name: 'Nguyễn Đức Minh',
        last_name: 'Trung',
        phone_number: '09744148784',
        gender: 'nam',
        birth_date: '01-10-2001',
        mail: 'minhtrung@gmail.com',
        role: 'CEO',
        avatar: 'https://i.ibb.co/mvybfht/C-i-n-3-1.jpg',
        address: 'Tan Quy Tây, Bình Chanh,HCM',
        status: 1,
    },
    {
        id: 2,
        first_name: 'Dương Đình Khả',
        last_name: 'Ngân',
        phone_number: '08844148784',
        gender: 'nữ',
        birth_date: '12-06-1996',
        mail: 'nganxulaku@gmail.com',
        role: 'diễn viên',
        avatar: 'https://duyendangvietnam.net.vn/public/uploads/files/Chau%20Chau/aaa(74).jpg',
        address: 'HCM',
        status: 1,
    },
    {
        id: 3,
        first_name: 'Hà',
        last_name: 'Nhi',
        phone_number: '08844148784',
        gender: 'nữ',
        birth_date: '08-02-1994',
        mail: 'nhixinhdep@gmail.com',
        role: 'ca sĩ',
        avatar: 'https://images2.thanhnien.vn/Uploaded/thynhm/2022_08_08/ha-nhi-7-8636.jpg',
        address: 'HCM',
        status: 1,
    },
    {
        id: 4,
        first_name: 'Lê Phạm',
        last_name: 'Ngân',
        phone_number: '08844148784',
        gender: 'nữ',
        birth_date: '01-10-2008',
        mail: 'nganxulaku@gmail.com',
        role: 'Thư Ký',
        avatar: 'https://th.bing.com/th/id/OIP.JZb8Bkv2vXm6G4W6KZy-rAHaHV?pid=ImgDet&rs=1',
        address: 'HCM',
        status: 1,
    }
]